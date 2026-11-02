# Strapi admin users

## First admin (easiest)
Open `https://cms.<your-domain>/admin` the first time. Strapi shows a "Create your first administrator" form. Fill it in; this account becomes the Super Admin. This form disappears once one admin exists.

## Create or reset admins from the server (no browser needed)
Dokploy > your Compose service > **Terminal** > choose container `strapi`, shell `sh`. Then:

```sh
cd /srv/app

# create an admin
npm run strapi admin:create-user -- --firstname=Abdilrahman --lastname=Abulani --email=you@example.com --password='Use-A-Long-Password-1!'

# reset a password
npm run strapi admin:reset-user-password -- --email=you@example.com --password='New-Long-Password-1!'
```

Passwords need 8+ characters with a lower case letter, an upper case letter and a number.
Avoid typing real passwords into shared terminals; change them in the admin panel afterwards.

## Add editors later (in the admin panel)
Settings > Administration panel > **Users** > Invite new user. Give them a role:
- **Editor**: create, edit and publish content.
- **Author**: create and edit their own content only.
- **Super Admin**: everything, including users and settings. Keep this to one or two people.

## API token for the website
Settings > API Tokens > Create new token:
- Name `website`, type **Read-only**, duration **Unlimited**.
- Use a second token, type **Custom** with only `create` on the Lead collection, for the contact form.
Copy each token when it is shown; Strapi never shows it again.

## Publish webhook (rebuild the site when content is published)
Settings > Webhooks > Create new webhook > Events: Entry publish and unpublish.
URL and headers depend on how the website is rebuilt; set this up when the build trigger exists.
