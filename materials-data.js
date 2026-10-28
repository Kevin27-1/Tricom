// Tri-Com Recycling - Materials Knowledge Directory & Guidelines
(function() {
  const MATERIAL_DETAILS_DATA = {
    'mat-newspaper': {
      title: 'Newspaper & Newsprint',
      category: 'curbside',
      theme: 'paper',
      icon: '📰',
      badge: 'ACCEPTED CURBSIDE',
      summary: 'Daily and weekly newspapers, advertising circulars, newsprint inserts, and community flyers.',
      preparation: [
        'Keep dry and clean; moisture causes mould and weakens paper fibres.',
        'Place loose into your blue recycling cart — do NOT bundle with plastic bags, string, or twine.',
        'Soiled paper with grease, food waste, or pet residue belongs in the garbage.'
      ],
      examples: ['Daily newspapers', 'Weekly community papers', 'Grocery sale flyers and inserts', 'Comic and entertainment sections'],
      notAccepted: ['Paper towels, napkins, and facial tissues (belong in compost or trash)', 'Greasy or food-stained paper'],
      destination: 'Baled at Tri-Com depot and shipped to certified Canadian paper mills under the Multi-Material Stewardship Manitoba (MMSM) program to be re-pulped into new newsprint.'
    },
    'mat-office-paper': {
      title: 'Office & Document Paper',
      category: 'curbside',
      theme: 'paper',
      icon: '📄',
      badge: 'ACCEPTED CURBSIDE',
      summary: 'White and coloured printer paper, notebook sheets, envelopes, brochures, and administrative documents.',
      preparation: [
        'Staples and small metal paperclips are acceptable; mill hydropulpers screen them out.',
        'Remove plastic spiral bindings, plastic report covers, and heavy metal binder clips.',
        'Shredded paper must be securely placed inside a clear transparent bag or paper bag to prevent wind litter.'
      ],
      examples: ['Copy and printer paper', 'Lined notebook paper', 'Standard mailing envelopes (with or without plastic windows)', 'Index cards, flyers, and receipts'],
      notAccepted: ['Carbon paper', 'Waxed or thermal sticker backing', 'Laminated sheets and plastic-coated binders'],
      destination: 'High-grade de-inking pulping: remanufactured into premium office paper, paper towels, and cardboard linerboard.'
    },
    'mat-flyers-mail': {
      title: 'Flyers & Direct Mail',
      category: 'curbside',
      theme: 'paper',
      icon: '✉️',
      badge: 'ACCEPTED CURBSIDE',
      summary: 'Advertising flyers, bulk mailings, promotional inserts, envelopes, and paper notices.',
      preparation: [
        'Remove any promotional magnets, plastic sample sachets, or product samples before recycling.',
        'Place directly into your blue recycling cart.'
      ],
      examples: ['Retail sales circulars', 'Postal mail advertising flyers', 'Standard paper envelopes', 'Paper brochures and menus'],
      notAccepted: ['Padded plastic bubble mailers (unless the paper sleeve is completely separated)', 'Tyvek synthetic durable envelopes'],
      destination: 'Processed with Mixed Paper (Grade 54) for regional paper and packaging manufacturing.'
    },
    'mat-magazines': {
      title: 'Magazines & Catalogs',
      category: 'curbside',
      theme: 'paper',
      icon: '📖',
      badge: 'ACCEPTED CURBSIDE',
      summary: 'Glossy periodicals, retail catalogs, seasonal lookbooks, trade journals, and softcover publications.',
      preparation: [
        'Remove external plastic protective delivery bags prior to recycling.',
        'Glossy paper coatings are water-soluble natural clay minerals that wash off cleanly during pulping.'
      ],
      examples: ['Monthly magazines', 'Retail shopping catalogs', 'Stapled and glue-bound soft periodicals', 'Paperback travel and community guides'],
      notAccepted: ['Hardcover books (donate if usable, or tear off rigid hardback spine first)', 'Plastic-laminated covers'],
      destination: 'Recycled into paperboard packaging, tissue products, and recycled newsprint.'
    },
    'mat-phone-books': {
      title: 'Phone Books & Directories',
      category: 'curbside',
      theme: 'paper',
      icon: '📒',
      badge: 'ACCEPTED CURBSIDE',
      summary: 'Softcover telephone directories, business yellow pages, and community guidebooks.',
      preparation: [
        'Ensure covers and pages are clean and dry.',
        'Place loose into your residential blue recycling cart.'
      ],
      examples: ['Residential telephone directories', 'Commercial yellow pages', 'Regional community directories'],
      notAccepted: ['Hardcover binders and daily planners', 'Leatherette covered desk directories'],
      destination: 'Processed into cellulose home insulation and molded paper egg cartons.'
    },
    'mat-cardboard': {
      title: 'Corrugated Cardboard',
      category: 'curbside',
      theme: 'paper',
      icon: '📦',
      badge: 'ACCEPTED CURBSIDE',
      summary: 'Layered corrugated shipping boxes, packing boxes, brown parcel cartons, and moving boxes.',
      preparation: [
        'FLATTEN all boxes completely to ensure collection truck capacity and cart space.',
        'Remove plastic air pillows, styrofoam inserts, bubble wrap, and wooden bracing.',
        'Oversized boxes exceeding cart dimensions can be brought directly to the Tri-Com main depot free of charge.'
      ],
      examples: ['Online delivery boxes (Amazon, parcel shipping)', 'Moving boxes and grocery cartons', 'Appliance shipping containers', 'Clean shoe and storage boxes'],
      notAccepted: ['Pizza boxes soaked with heavy grease/cheese oil (place in compost or trash)', 'Wax-coated vegetable cartons'],
      destination: 'Compressed into heavy-duty 1,200 lb industrial bales at Tri-Com and shipped to Canadian containerboard mills.'
    },
    'mat-boxboard': {
      title: 'Boxboard & Paper Packaging',
      category: 'curbside',
      theme: 'paper',
      icon: '🥣',
      badge: 'ACCEPTED CURBSIDE',
      summary: 'Single-layer non-corrugated paperboard packaging for dry foods, household goods, and toiletries.',
      preparation: [
        'Remove plastic interior food bags (cereal bags, plastic trays) before flattening.',
        'Flatten boxes flat to save bin space.'
      ],
      examples: ['Cereal, cracker, and cookie boxes', 'Pasta and rice cartons', 'Facial tissue boxes (remove plastic film)', 'Paper egg cartons', 'Toothpaste and pharmaceutical packaging'],
      notAccepted: ['Foil-lined potato chip bags', 'Frozen food boxes with heavy plastic moisture barriers'],
      destination: 'Hydropulped and remanufactured into new boxboard containers and paper packaging liners.'
    },
    'mat-plastic-containers': {
      title: 'Plastic Containers (#1 through #5)',
      category: 'curbside',
      theme: 'containers',
      icon: '🧴',
      badge: 'ACCEPTED CURBSIDE',
      summary: 'Rigid plastic bottles, jugs, tubs, and food containers stamped with recycling codes #1, #2, #3, #4, or #5.',
      preparation: [
        'Empty all contents and rinse clean of food, condiment, or detergent residues.',
        'Screw plastic caps back onto rinsed bottles before placing in your cart.',
        'Do not squash containers completely flat so automated optical sorting eyes can classify the resin.'
      ],
      examples: ['Beverage and water bottles (#1 PET)', 'Milk jugs and laundry detergent bottles (#2 HDPE)', 'Margarine, yogurt, and sour cream tubs (#5 PP)', 'Condiment bottles (ketchup, mustard, mayonnaise)'],
      notAccepted: ['Plastic grocery bags, bubble wrap, and stretch film', 'Styrofoam (#6 PS)', 'Motor oil containers (hazardous drop-off only)', 'Plastic cutlery and straws'],
      destination: 'Sorted by optical sorters into resin fractions, flaked, and remanufactured into new food-grade bottles, fleece textiles, and drainage piping.'
    },
    'mat-aluminum-cans': {
      title: 'Aluminum Cans & Beverage Tins',
      category: 'curbside',
      theme: 'metals',
      icon: '🥫',
      badge: 'ACCEPTED CURBSIDE',
      summary: 'Clean aluminum beverage cans, soft drink tins, seltzer cans, and aluminum baking foil.',
      preparation: [
        'Empty all remaining liquids.',
        'Quickly rinse with cold water.',
        'Aluminum is 100% recyclable infinitely without degradation in quality!'
      ],
      examples: ['Soda and pop cans', 'Beer, cider, and seltzer cans', 'Energy drink cans', 'Clean aluminum foil and pie plates (wipe food off)'],
      notAccepted: ['Aerosol spray cans with residual propellant (take to depot hazardous waste)', 'Automotive scrap metal'],
      destination: 'Smelted into aluminum sheet ingots and back on store shelves as new cans within 60 days.'
    },
    'mat-steel-tin-cans': {
      title: 'Steel & Tin Food Cans',
      category: 'curbside',
      theme: 'metals',
      icon: '⚙️',
      badge: 'ACCEPTED CURBSIDE',
      summary: 'Magnetic food cans, soup tins, pet food tins, and steel jar lids.',
      preparation: [
        'Rinse thoroughly to remove food grease and residue.',
        'Push metal lids inside the can or crimp the top opening shut for collection safety.'
      ],
      examples: ['Soup and vegetable cans', 'Pet food cans (cat & dog food tins)', 'Canned fruit, tomato sauce, and bean cans', 'Metal jar and bottle lids'],
      notAccepted: ['Paint cans with wet paint (take to depot Product Care drop-off)', 'Propane tanks', 'Nails, screws, or construction scrap'],
      destination: 'Separated with high-intensity magnetic cross-belt pulleys and melted at steel mills for reinforcing rebar and automotive steel.'
    },
    'mat-glass-bottles': {
      title: 'Glass Beverage Bottles',
      category: 'curbside',
      theme: 'beverage',
      icon: '🍾',
      badge: 'ACCEPTED CURBSIDE',
      summary: 'Clear, green, amber, and brown glass beverage bottles.',
      preparation: [
        'Rinse clean of all contents.',
        'Remove metal caps (recycle caps with steel cans).',
        'Do not break; place intact bottles in your bin.'
      ],
      examples: ['Wine and spirits glass bottles', 'Non-deposit beverage and iced tea glass bottles', 'Vinegar and olive oil glass bottles'],
      notAccepted: ['Drinking glasses and crystal stemware', 'Ceramic mugs and plates', 'Window panes and mirror glass'],
      destination: 'Sorted optically by colour, crushed into cullet, and melted into brand-new glass containers or eco-aggregate.'
    },
    'mat-glass-jars': {
      title: 'Glass Food Jars',
      category: 'curbside',
      theme: 'beverage',
      icon: '🫙',
      badge: 'ACCEPTED CURBSIDE',
      summary: 'Food storage jars, pasta sauce jars, pickle jars, and condiment jars made of glass.',
      preparation: [
        'Rinse thoroughly with water to remove oils and sauce.',
        'Metal lids can be recycled separately with tin cans.'
      ],
      examples: ['Pasta sauce jars', 'Pickle, olive, and condiment jars', 'Baby food glass jars', 'Jam and jelly jars'],
      notAccepted: ['Pyrex, CorningWare, and oven-safe borosilicate bakeware', 'Lightbulbs'],
      destination: 'Crushed into high-purity glass cullet and remelted into new food containers.'
    },
    'mat-milk-cartons': {
      title: 'Milk & Beverage Cartons',
      category: 'curbside',
      theme: 'beverage',
      icon: '🧃',
      badge: 'ACCEPTED CURBSIDE',
      summary: 'Polycoat gable-top paper cartons and aseptic drink boxes (Tetra Pak style).',
      preparation: [
        'Empty contents completely and rinse.',
        'Push plastic straws inside the carton or discard straw in trash.',
        'Keep plastic screw caps attached to the carton.'
      ],
      examples: ['Milk and cream gable-top paper cartons', 'Juice boxes and iced tea cartons', 'Soup and broth aseptic cartons', 'Almond and oat beverage cartons'],
      notAccepted: ['Plastic pouch squeeze packs (baby food fruit pouches, foil drink pouches)'],
      destination: 'Hydra-pulped to extract high-strength virgin bleached paper fibres from thin polyethylene moisture barriers.'
    },
    'mat-lead-acid-batteries': {
      title: 'Lead-Acid & Vehicle Batteries',
      category: 'dropoff',
      theme: 'hazardous',
      icon: '🔋',
      badge: 'SPECIAL DROP-OFF',
      summary: 'Automotive, marine, powersport, and industrial lead-acid storage batteries.',
      preparation: [
        'NEVER place in curbside carts — severe fire, explosion, and corrosive acid hazard.',
        'Inspect casing for cracks or acid leaks; transport upright in a plastic container.',
        'Deliver directly to the Tri-Com main depot receiving attendant in The Pas.'
      ],
      examples: ['Car, SUV, and truck 12V batteries', 'Boat and marine deep-cycle batteries', 'Snowmobile, motorcycle, and ATV batteries', 'Solar storage and commercial forklift batteries'],
      notAccepted: ['Damaged batteries with active acid leaks (notify staff immediately on arrival)'],
      destination: 'Certified Call2Recycle / EPRA stewardship recycling: 99% of lead, plastic casing, and sulphuric acid is recovered and reused.'
    },
    'mat-electronic-waste': {
      title: 'Electronic Waste (E-Waste)',
      category: 'dropoff',
      theme: 'electronics',
      icon: '🖥️',
      badge: 'SPECIAL DROP-OFF',
      summary: 'Computers, televisions, audio/visual electronics, telecommunications devices, and accessories.',
      preparation: [
        'Certified drop-off under EPRA Manitoba (Electronics Product Recycling Association).',
        'Wipe personal files and sensitive data from hard drives and mobile phones.',
        'Bring to depot electronics staging intake; staff assist with certified receiving logs.'
      ],
      examples: ['Desktop PCs, laptops, and tablets', 'TVs and monitors (CRT, LCD, LED, OLED)', 'Printers, scanners, and copiers', 'Stereos, speakers, gaming consoles', 'Cables, adapters, keyboards, and mice'],
      notAccepted: ['Large household whitegoods (fridges, stoves — handle via scrap metal intake)'],
      destination: 'Dismantled at licensed Canadian e-waste facilities: recovering gold, silver, copper, circuit boards, and clean plastics.'
    },
    'mat-hazardous-waste': {
      title: 'Household Hazardous Waste (HHW)',
      category: 'dropoff',
      theme: 'hazardous',
      icon: '⚠️',
      badge: 'SPECIAL DROP-OFF',
      summary: 'Paints, chemical solvents, pesticides, flammable liquids, and corrosive household chemicals.',
      preparation: [
        'Regulated under Product Care Association stewardship plan.',
        'Keep materials in their original labeled containers with secure tight lids.',
        'Never mix chemicals together; transport containers secured upright in your trunk.'
      ],
      examples: ['Interior and exterior latex & oil paints', 'Wood stains, varnishes, and primers', 'Aerosol spray paint cans', 'Pesticides, herbicides, and lawn chemicals', 'Pool chemicals and industrial degreasers'],
      notAccepted: ['Unlabeled unknown chemical mixtures', 'Explosives, ammunition, and road flares', 'Bio-medical sharps/needles'],
      destination: 'Reusable paint is blended into recycled paints or used in cement manufacturing; toxics are safely neutralized by licensed contractors.'
    },
    'mat-propane-cylinders': {
      title: 'Propane & Gas Cylinders',
      category: 'dropoff',
      theme: 'hazardous',
      icon: '🛢️',
      badge: 'SPECIAL DROP-OFF',
      summary: 'Pressurized BBQ propane tanks, camping cylinders, and small fuel canisters.',
      preparation: [
        'SEVERE EXPLOSION HAZARD — Never dispose of in curbside carts or scrap compactors.',
        'Ensure cylinder valves are firmly closed and safety caps are secured.',
        'Transport upright in a well-ventilated vehicle space.'
      ],
      examples: ['20 lb BBQ propane cylinders', '1 lb camping stove green bottles', 'Propane torch canisters', 'Helium balloon tanks'],
      notAccepted: ['Acetylene welding tanks', 'Medical oxygen cylinders (must be returned to healthcare supplier)'],
      destination: 'Depressurized safely, valves extracted by certified technicians, and high-tensile steel shell recycled at metal foundries.'
    },
    'mat-fluorescent-bulbs': {
      title: 'Fluorescent Tubes & CFLs',
      category: 'dropoff',
      theme: 'hazardous',
      icon: '💡',
      badge: 'SPECIAL DROP-OFF',
      summary: 'Fluorescent lighting tubes, compact fluorescent lamps (CFLs), and mercury-vapour lamps.',
      preparation: [
        'Handle carefully to prevent tube breakage (mercury vapour health hazard).',
        'Do not tape tubes together with adhesive tape; place in cardboard tubes or cartons.',
        'Drop off at the depot lighting collection rack.'
      ],
      examples: ['4-foot and 8-foot fluorescent lighting tubes', 'Spiral compact fluorescent (CFL) bulbs', 'U-bend and circular tubes', 'High-intensity discharge (HID) commercial bulbs'],
      notAccepted: ['Broken glass shards (seal in a rigid container and label before arrival)', 'Incandescent globes (regular trash)'],
      destination: 'Processed in specialized closed-loop distillation retorts: capturing elemental mercury, phosphor powder, aluminum, and clean glass.'
    },
    'mat-styrofoam-foam': {
      title: 'Styrofoam & Polystyrene Foam',
      category: 'notaccepted',
      theme: 'rejected',
      icon: '🚫',
      badge: 'NOT ACCEPTED',
      summary: 'Expanded polystyrene foam, packing peanuts, foam clamshells, and grocery meat trays.',
      preparation: [
        'CANNOT be accepted in curbside carts or standard depot recycling.',
        'Foam breaks apart into microscopic beads during baling, contaminating thousands of pounds of paper and plastic.',
        'Reuse clean packaging foam or place in regular municipal solid waste bags.'
      ],
      examples: ['Foam coffee cups and food takeout containers', 'Molded foam electronics packaging blocks', 'Foam packing peanuts (loose fill)', 'Meat, seafood, and produce foam trays'],
      notAccepted: ['All polystyrene foam items are non-recyclable in this municipal stream.'],
      destination: 'Disposed of via regular municipal solid waste.'
    },
    'mat-black-plastic': {
      title: 'Black Plastic Products',
      category: 'notaccepted',
      theme: 'rejected',
      icon: '🚫',
      badge: 'NOT ACCEPTED',
      summary: 'Takeout food containers, seedling trays, and coffee cup lids manufactured with black resin.',
      preparation: [
        'Optical near-infrared (NIR) sorters rely on reflected light; carbon black pigment absorbs light wavelengths, rendering containers invisible to automated sorting systems.',
        'Place black plastics into regular household garbage.'
      ],
      examples: ['Black takeout sushi and microwave food trays', 'Black plastic coffee cup lids', 'Black plastic plant nursery pots', 'Black plastic cutlery and meal trays'],
      notAccepted: ['Any item colored with carbon black pigment.'],
      destination: 'Disposed of via regular municipal garbage.'
    },
    'mat-scrap-metal': {
      title: 'Scrap Metal & Heavy Hardware',
      category: 'notaccepted',
      theme: 'rejected',
      icon: '🚫',
      badge: 'NOT ACCEPTED IN BINS',
      summary: 'Pots, pans, wire fencing, car parts, chains, steel pipes, and large hardware.',
      preparation: [
        'DO NOT place in curbside recycling carts — causes catastrophic jams in sorting conveyor belts and balers.',
        'For commercial structural scrap, contact our depot yard attendants regarding specialized bulk scrap staging.'
      ],
      examples: ['Frying pans, baking sheets, and cooking pots', 'Coat hangers, chains, and wire fencing', 'Automotive engine blocks and brake drums', 'Pipes, rebar, and construction steel'],
      notAccepted: ['Scrap metal in curbside recycling carts.'],
      destination: 'Handled at industrial metal recycling scrap yards; not processed in residential single-stream.'
    }
  };

  function getMaterialDetails(idOrTitle) {
    if (!idOrTitle) return null;
    const cleanQuery = String(idOrTitle).trim().toLowerCase();

    // 1. Direct key match
    if (MATERIAL_DETAILS_DATA[idOrTitle]) {
      return MATERIAL_DETAILS_DATA[idOrTitle];
    }

    // 2. Search by ID or title in static dictionary
    for (const [key, item] of Object.entries(MATERIAL_DETAILS_DATA)) {
      if (key.toLowerCase() === cleanQuery || item.title.toLowerCase() === cleanQuery) {
        return item;
      }
    }

    // 3. Check custom materials stored in localStorage
    try {
      const stored = localStorage.getItem('tricom_materials');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const found = parsed.find(m => 
            (m.id && m.id.toLowerCase() === cleanQuery) ||
            (m.title && m.title.toLowerCase() === cleanQuery)
          );
          if (found) {
            return {
              title: found.title,
              category: found.category || 'curbside',
              theme: found.theme || 'paper',
              icon: found.icon || '📦',
              badge: found.category === 'curbside' ? 'ACCEPTED CURBSIDE' : (found.category === 'dropoff' ? 'SPECIAL DROP-OFF' : 'NOT ACCEPTED'),
              summary: found.description || 'Guidelines and recycling rules for this material.',
              preparation: [
                found.category === 'curbside' ? 'Empty, rinse clean, and place loose in your blue cart.' :
                found.category === 'dropoff' ? 'Bring directly to the main facility yard drop-off during operating hours.' :
                'Do not place in curbside carts or depot streams. Dispose of with regular municipal waste.'
              ],
              examples: [found.title],
              notAccepted: ['Heavily contaminated or hazardous unrinsed materials.'],
              destination: 'Handled in certified stewardship and regional material recovery programs.'
            };
          }
        }
      }
    } catch(e) {}

    // 4. Fuzzy match in static dictionary
    for (const [key, item] of Object.entries(MATERIAL_DETAILS_DATA)) {
      if (item.title.toLowerCase().includes(cleanQuery) || cleanQuery.includes(item.title.toLowerCase())) {
        return item;
      }
    }

    return null;
  }

  window.MATERIAL_DETAILS_DATA = MATERIAL_DETAILS_DATA;
  window.getMaterialDetails = getMaterialDetails;
})();

