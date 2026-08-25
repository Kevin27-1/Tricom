import json
import requests
from http.server import HTTPServer, SimpleHTTPRequestHandler
from google.oauth2 import service_account
import google.auth.transport.requests

SERVICE_ACCOUNT_FILE = 'serviceAccountKey.json'
SCOPES = ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/datastore']
PROJECT_ID = 'tricom-recycling'
BASE_FIRESTORE_URL = f'https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents'

class FirestoreRequestHandler(SimpleHTTPRequestHandler):
    def _get_auth_headers(self):
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
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        if self.path.startswith('/api/messages'):
            headers = self._get_auth_headers()
            res = requests.get(f'{BASE_FIRESTORE_URL}/messages', headers=headers)
            self.send_response(res.status_code)
            self._send_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(res.content)
        elif self.path.startswith('/api/news'):
            headers = self._get_auth_headers()
            res = requests.get(f'{BASE_FIRESTORE_URL}/news', headers=headers)
            self.send_response(res.status_code)
            self._send_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(res.content)
        else:
            super().do_GET()

    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body_bytes = self.rfile.read(content_length)
        body = json.loads(body_bytes.decode('utf-8')) if body_bytes else {}

        headers = self._get_auth_headers()

        if self.path == '/api/messages':
            fields = {
                'name': {'stringValue': body.get('name', '')},
                'email': {'stringValue': body.get('email', '')},
                'message': {'stringValue': body.get('message', '')},
                'date': {'stringValue': body.get('date', '')},
                'read': {'booleanValue': body.get('read', False)},
                'timestamp': {'integerValue': str(body.get('timestamp', 0))}
            }
            res = requests.post(f'{BASE_FIRESTORE_URL}/messages', headers=headers, json={'fields': fields})
            self.send_response(res.status_code)
            self._send_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(res.content)

        elif self.path == '/api/news':
            fields = {
                'title': {'stringValue': body.get('title', '')},
                'badge': {'stringValue': body.get('badge', 'NOTICE')},
                'date': {'stringValue': body.get('date', '')},
                'excerpt': {'stringValue': body.get('excerpt', '')},
                'image': {'stringValue': body.get('image', '')}
            }
            res = requests.post(f'{BASE_FIRESTORE_URL}/news', headers=headers, json={'fields': fields})
            self.send_response(res.status_code)
            self._send_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(res.content)

        else:
            self.send_response(404)
            self.end_headers()

def run_server(port=8086):
    # Keep the preview server available only on this machine.
    server_address = ('127.0.0.1', port)
    httpd = HTTPServer(server_address, FirestoreRequestHandler)
    print(f"Tri-Com Firebase Firestore API Bridge running on http://localhost:{port}")
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()
