# Ginger & Crumb website

The public site is plain HTML, built from the files in `src/_data/`. Your sister-in-law edits those through the admin page at `/admin`, so she never touches code.

## One-time setup (about 30 minutes, on a computer)

1. **GitHub:** create a free account at github.com. Click **New repository**, name it `gingerandcrumb-site`, and create it. Then choose **uploading an existing file** and drag in everything from this folder (not the folder itself). Commit.
2. **Point the admin at your repository:** on GitHub, open `src/admin/config.yml`, click the pencil, and replace `YOUR-GITHUB-USERNAME` with your GitHub username. Commit.
3. **Netlify:** sign up at netlify.com using your GitHub account. Choose **Add new project → Import an existing project → GitHub** and pick `gingerandcrumb-site`. The build settings fill in from `netlify.toml`. Click **Deploy**. Note the site address it gives you.
4. **Let the admin page log in with GitHub:**
   - On GitHub: **Settings → Developer settings → OAuth Apps → New OAuth App**.
     - Homepage URL: your Netlify site address
     - Authorization callback URL: `https://api.netlify.com/auth/done`
   - Copy the **Client ID**, then **Generate a new client secret** and copy it.
   - On Netlify: open the project, go to **Project configuration → Access & security → OAuth → Install provider**, choose **GitHub**, and paste both values. (Netlify sometimes renames menus; search their docs for "OAuth provider tokens" if it has moved.)
5. **Give your sister-in-law access:** she creates a free GitHub account. In the repository go to **Settings → Collaborators → Add people** and invite her. She accepts the email invite.
6. **Order form:** create a free form at formspree.io with her email. In the admin page, open **Business details & page text** and paste the form ID (the part after `/f/`).
7. **Domain (optional):** buy a domain such as gingerandcrumb.ca and add it in Netlify under **Domain management**.

## How she edits

Go to `https://YOUR-SITE/admin`, click **Login with GitHub**, change anything, and click **Publish**. The site updates in about a minute.
