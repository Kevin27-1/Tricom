import os
import json
import urllib.parse
import requests
from http.server import HTTPServer, SimpleHTTPRequestHandler
from google.oauth2 import service_account
import google.auth.transport.requests

# Path to service account credentials
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SERVICE_ACCOUNT_FILE = os.environ.get(
    'FIREBASE_SERVICE_ACCOUNT_PATH',
    os.path.join(BASE_DIR, 'serviceAccountKey.json')
)

SCOPES = [
    'https://www.googleapis.com/auth/cloud-platform',
    'https://www.googleapis.com/auth/datastore'
]

def get_project_id():
    """Retrieve Project ID dynamically from the service account or env."""
    if os.environ.get('FIREBASE_PROJECT_ID'):
        return os.environ.get('FIREBASE_PROJECT_ID')
    if os.path.exists(SERVICE_ACCOUNT_FILE):
        try:
            with open(SERVICE_ACCOUNT_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f)
                return data.get('project_id', 'tricom-recycling')
        except Exception:
            pass
    return 'tricom-recycling'

PROJECT_ID = get_project_id()
BASE_FIRESTORE_URL = f'https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents'

class FirestoreRequestHandler(SimpleHTTPRequestHandler):
    def _get_auth_headers(self):
        if not os.path.exists(SERVICE_ACCOUNT_FILE):
            raise FileNotFoundError(f"Service account file not found at {SERVICE_ACCOUNT_FILE}")
        credentials = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE, scopes=SCOPES
        )
        req = google.auth.transport.requests.Request()
        credentials.refresh(req)
        return {
            'Authorization': f'Bearer {credentials.token}',
            'Content-Type': 'application/json'
        }

    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    def _send_json_response(self, status_code, data):
        self.send_response(status_code)
        self._send_cors_headers()
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        if isinstance(data, (dict, list)):
            self.wfile.write(json.dumps(data).encode('utf-8'))
        elif isinstance(data, bytes):
            self.wfile.write(data)
        elif isinstance(data, str):
            self.wfile.write(data.encode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.rstrip('/')

        if path == '/api/health':
            self._send_json_response(200, {
                'status': 'healthy',
                'project_id': PROJECT_ID,
                'credentials_loaded': os.path.exists(SERVICE_ACCOUNT_FILE)
            })
            return

        if path == '/api/messages':
            try:
                headers = self._get_auth_headers()
                res = requests.get(f'{BASE_FIRESTORE_URL}/messages', headers=headers)
                self._send_json_response(res.status_code, res.content)
            except Exception as e:
                self._send_json_response(500, {'error': str(e)})
            return

        if path == '/api/news':
            try:
                headers = self._get_auth_headers()
                res = requests.get(f'{BASE_FIRESTORE_URL}/news', headers=headers)
                self._send_json_response(res.status_code, res.content)
            except Exception as e:
                self._send_json_response(500, {'error': str(e)})
            return

        # Serve static files as default fallback
        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.rstrip('/')

        content_length = int(self.headers.get('Content-Length', 0))
        body_bytes = self.rfile.read(content_length)
        body = json.loads(body_bytes.decode('utf-8')) if body_bytes else {}

        try:
            headers = self._get_auth_headers()
        except Exception as e:
            self._send_json_response(500, {'error': f'Auth failed: {str(e)}'})
            return

        if path == '/api/messages':
            fields = {
                'name': {'stringValue': str(body.get('name', ''))},
                'email': {'stringValue': str(body.get('email', ''))},
                'message': {'stringValue': str(body.get('message', ''))},
                'date': {'stringValue': str(body.get('date', ''))},
                'read': {'booleanValue': bool(body.get('read', False))},
                'timestamp': {'integerValue': str(body.get('timestamp', 0))}
            }
            res = requests.post(f'{BASE_FIRESTORE_URL}/messages', headers=headers, json={'fields': fields})
            self._send_json_response(res.status_code, res.content)

        elif path == '/api/news':
            doc_id = body.get('id')
            fields = {
                'title': {'stringValue': str(body.get('title', ''))},
                'badge': {'stringValue': str(body.get('badge', 'NOTICE'))},
                'date': {'stringValue': str(body.get('date', ''))},
                'excerpt': {'stringValue': str(body.get('excerpt', ''))},
                'image': {'stringValue': str(body.get('image', ''))}
            }
            if doc_id:
                # Set with specific document ID
                url = f'{BASE_FIRESTORE_URL}/news?documentId={doc_id}'
            else:
                url = f'{BASE_FIRESTORE_URL}/news'
            res = requests.post(url, headers=headers, json={'fields': fields})
            self._send_json_response(res.status_code, res.content)

        else:
            self._send_json_response(404, {'error': 'Endpoint not found'})

    def do_PATCH(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.rstrip('/')

        content_length = int(self.headers.get('Content-Length', 0))
        body_bytes = self.rfile.read(content_length)
        body = json.loads(body_bytes.decode('utf-8')) if body_bytes else {}

        try:
            headers = self._get_auth_headers()
        except Exception as e:
            self._send_json_response(500, {'error': f'Auth failed: {str(e)}'})
            return

        if path.startswith('/api/messages/'):
            doc_id = path.split('/')[-1]
            fields = {}
            update_mask = []
            if 'read' in body:
                fields['read'] = {'booleanValue': bool(body['read'])}
                update_mask.append('updateMask.fieldPaths=read')
            if 'name' in body:
                fields['name'] = {'stringValue': str(body['name'])}
                update_mask.append('updateMask.fieldPaths=name')

            mask_str = '&'.join(update_mask)
            url = f'{BASE_FIRESTORE_URL}/messages/{doc_id}' + (f'?{mask_str}' if mask_str else '')
            res = requests.patch(url, headers=headers, json={'fields': fields})
            self._send_json_response(res.status_code, res.content)

        elif path.startswith('/api/news/'):
            doc_id = path.split('/')[-1]
            fields = {}
            update_mask = []
            for k in ['title', 'badge', 'date', 'excerpt', 'image']:
                if k in body:
                    fields[k] = {'stringValue': str(body[k])}
                    update_mask.append(f'updateMask.fieldPaths={k}')

            mask_str = '&'.join(update_mask)
            url = f'{BASE_FIRESTORE_URL}/news/{doc_id}' + (f'?{mask_str}' if mask_str else '')
            res = requests.patch(url, headers=headers, json={'fields': fields})
            self._send_json_response(res.status_code, res.content)

        else:
            self._send_json_response(404, {'error': 'Endpoint not found'})

    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.rstrip('/')

        try:
            headers = self._get_auth_headers()
        except Exception as e:
            self._send_json_response(500, {'error': f'Auth failed: {str(e)}'})
            return

        if path.startswith('/api/messages/'):
            doc_id = path.split('/')[-1]
            res = requests.delete(f'{BASE_FIRESTORE_URL}/messages/{doc_id}', headers=headers)
            self._send_json_response(res.status_code, res.content or b'{}')

        elif path.startswith('/api/news/'):
            doc_id = path.split('/')[-1]
            res = requests.delete(f'{BASE_FIRESTORE_URL}/news/{doc_id}', headers=headers)
            self._send_json_response(res.status_code, res.content or b'{}')

        else:
            self._send_json_response(404, {'error': 'Endpoint not found'})

def run_server(port=8086):
    server_address = ('127.0.0.1', port)
    httpd = HTTPServer(server_address, FirestoreRequestHandler)
    print(f"Tri-Com Secure Backend API running at http://localhost:{port}")
    print(f"Firestore Project: {PROJECT_ID}")
    print(f"Service Account: {SERVICE_ACCOUNT_FILE}")
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()
