#!/bin/sh
# Run on the Dokploy server. Usage: sh install-schema.sh <strapi-container-name>
C="$1"; [ -n "$C" ] || { echo "give the container name"; exit 1; }
docker exec "$C" mkdir -p "/opt/app/src/api/lead/content-types/lead"
docker exec -i "$C" sh -c 'cat > /opt/app/src/api/lead/content-types/lead/schema.json' <<'EOF_FILE'
{
  "kind": "collectionType",
  "collectionName": "leads",
  "info": { "singularName": "lead", "pluralName": "leads", "displayName": "Lead" },
  "options": { "draftAndPublish": false },
  "attributes": {
    "name": { "type": "string" },
    "email": { "type": "email", "required": true },
    "company": { "type": "string" },
    "topic": { "type": "string" },
    "message": { "type": "text" },
    "source": { "type": "string" },
    "handled": { "type": "boolean", "default": false }
  }
}
EOF_FILE
docker exec "$C" mkdir -p "/opt/app/src/api/lead/controllers"
docker exec -i "$C" sh -c 'cat > /opt/app/src/api/lead/controllers/lead.js' <<'EOF_FILE'
'use strict';
const { factories } = require('@strapi/strapi');
module.exports = factories.createCoreController('api::lead.lead');
EOF_FILE
docker exec "$C" mkdir -p "/opt/app/src/api/lead/routes"
docker exec -i "$C" sh -c 'cat > /opt/app/src/api/lead/routes/lead.js' <<'EOF_FILE'
'use strict';
const { factories } = require('@strapi/strapi');
module.exports = factories.createCoreRouter('api::lead.lead');
EOF_FILE
docker exec "$C" mkdir -p "/opt/app/src/api/lead/services"
docker exec -i "$C" sh -c 'cat > /opt/app/src/api/lead/services/lead.js' <<'EOF_FILE'
'use strict';
const { factories } = require('@strapi/strapi');
module.exports = factories.createCoreService('api::lead.lead');
EOF_FILE
docker exec "$C" mkdir -p "/opt/app/src/api/use-case/content-types/use-case"
docker exec -i "$C" sh -c 'cat > /opt/app/src/api/use-case/content-types/use-case/schema.json' <<'EOF_FILE'
{
  "kind": "collectionType",
  "collectionName": "use_cases",
  "info": { "singularName": "use-case", "pluralName": "use-cases", "displayName": "Use case" },
  "options": { "draftAndPublish": true },
  "attributes": {
    "slug": { "type": "uid", "targetField": "title", "required": true },
    "sector": { "type": "string", "required": true },
    "title": { "type": "string", "required": true },
    "summary": { "type": "text", "required": true },
    "sub": { "type": "text", "required": true },
    "tags": { "type": "json" },
    "dataIn": { "type": "string" },
    "aiDoes": { "type": "string" },
    "teamGets": { "type": "string" },
    "photo": { "type": "media", "multiple": false, "allowedTypes": ["images"] },
    "alt": { "type": "string" },
    "tileBg": { "type": "string", "default": "#070908" },
    "tileLine": { "type": "string", "default": "#3A4542" },
    "tilePebble": { "type": "string", "default": "#00D2AA" },
    "challenge": { "type": "text", "required": true },
    "solution": { "type": "text", "required": true },
    "points": { "type": "component", "repeatable": true, "component": "usecase.item" },
    "caps": { "type": "component", "repeatable": true, "component": "usecase.item" },
    "deep": { "type": "component", "repeatable": true, "component": "usecase.paragraph" },
    "outcomes": { "type": "component", "repeatable": true, "component": "usecase.outcome" },
    "order": { "type": "integer", "default": 0 }
  }
}
EOF_FILE
docker exec "$C" mkdir -p "/opt/app/src/api/use-case/controllers"
docker exec -i "$C" sh -c 'cat > /opt/app/src/api/use-case/controllers/use-case.js' <<'EOF_FILE'
'use strict';
const { factories } = require('@strapi/strapi');
module.exports = factories.createCoreController('api::use-case.use-case');
EOF_FILE
docker exec "$C" mkdir -p "/opt/app/src/api/use-case/routes"
docker exec -i "$C" sh -c 'cat > /opt/app/src/api/use-case/routes/use-case.js' <<'EOF_FILE'
'use strict';
const { factories } = require('@strapi/strapi');
module.exports = factories.createCoreRouter('api::use-case.use-case');
EOF_FILE
docker exec "$C" mkdir -p "/opt/app/src/api/use-case/services"
docker exec -i "$C" sh -c 'cat > /opt/app/src/api/use-case/services/use-case.js' <<'EOF_FILE'
'use strict';
const { factories } = require('@strapi/strapi');
module.exports = factories.createCoreService('api::use-case.use-case');
EOF_FILE
docker exec "$C" mkdir -p "/opt/app/src/components/usecase"
docker exec -i "$C" sh -c 'cat > /opt/app/src/components/usecase/item.json' <<'EOF_FILE'
{
  "collectionName": "components_usecase_items",
  "info": { "displayName": "Title and text", "icon": "bulletList" },
  "attributes": {
    "t": { "type": "string", "required": true },
    "d": { "type": "text", "required": true }
  }
}
EOF_FILE
docker exec "$C" mkdir -p "/opt/app/src/components/usecase"
docker exec -i "$C" sh -c 'cat > /opt/app/src/components/usecase/outcome.json' <<'EOF_FILE'
{
  "collectionName": "components_usecase_outcomes",
  "info": { "displayName": "Outcome", "icon": "chartCircle" },
  "attributes": {
    "n": { "type": "string", "required": true },
    "l": { "type": "string", "required": true }
  }
}
EOF_FILE
docker exec "$C" mkdir -p "/opt/app/src/components/usecase"
docker exec -i "$C" sh -c 'cat > /opt/app/src/components/usecase/paragraph.json' <<'EOF_FILE'
{
  "collectionName": "components_usecase_paragraphs",
  "info": { "displayName": "Paragraph", "icon": "align-left" },
  "attributes": {
    "text": { "type": "text", "required": true }
  }
}
EOF_FILE
docker restart "$C"
echo done
