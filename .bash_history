ls
cd studio
ls
git init
git add .
git commit -m "Initial commit - SDGs project"
git push
git remote add origin https://github.com/Mwende-Fifi/sdgs_project_hackathon.git
git push origin main
firebase login
firebase init hosting
ls
cd studio
ls
firebase login --no-localhost
firebase init hosting
git init
git add .
git rm --cached -r studio
git rm --cached -f studio
ls
git rm -rf --cached studio
clear
git status
clear
git reset
git add .gitignore
git status
git add .
git rm --cached studio
git rm --cached -f studio
clear
pwd
git status
pwd
ls -la
git status
ls -la studio/
rm -rf studio/.git
ls
git add studio/
git status
ls
cd studio
ls
vi .gitignore
echo -e "# Android SDK and Emulator\n.androidsdkroot/\n.emu/\n\n# VS Code and Cloud Workstations\n.codeoss-cloudworkstations/\n\n# TypeScript Cache\n.cache/\n\n# Node.js\nnode_modules/\npackage-lock.json\n\n# Environment-specific and user files\n.bash_history\n.bash_logout\n.bashrc\n.profile\n.gitconfig\n\n# AI Index and Temporary Files\n.monospace-ai-index/\n.config/" >> .gitignore
cd ..
git status
touch .gitignore
cat <<EOL > .gitignore
# Android SDK and Emulator
.androidsdkroot/
.emu/

# VS Code and Cloud Workstations
.codeoss-cloudworkstations/

# TypeScript and Dependency Cache
.cache/
node_modules/
package-lock.json

# User and Environment Files
.bash_history
.bash_logout
.bashrc
.profile
.gitconfig
.viminfo

# AI Index and Configuration Files
.monospace-ai-index/
.config/
.idx/

# Firebase Configuration
.config/configstore/

# Temporary and System Files
*.log
*.lock
*.ini
*.img
*.qcow2
*.pb
*.bin
*.xml
EOL

git status
pwd
ls
cd ..
cd studio
cd user
rm -rf .gitignore
cd ..
touch .gitignore
cd user
clear
touch .gitignore
vi .gitignore
git status
clear
git rm --cached -r .
cat <<EOL > studio/.gitignore
# Next.js
.next/
out/
build/
dist/

# Node.js
node_modules/
package-lock.json

# Environment Variables
.env
.env.local
.env.development
.env.test
.env.production

# Temporary Files
*.log
*.cache
EOL

git add .
git commit -m "Add project files"
git push
clear
git remote add origin https://github.com/Mwende-Fifi/sdgs_project_hackathon.git
git status
git add .
git commit -m "Add log files"
git push
git push --set-upstream origin main
git ls-files | xargs ls -lh | sort -k5 -hr | head -20
du -sh .git/
du -sh studio/node_modules/ 2>/dev/null || echo "node_modules not found"
cat > .gitignore << EOF
# Android SDK and Emulator
.androidsdkroot/
.emu/

# IDE and System files
.codeoss-cloudworkstations/
.idx/
.monospace-ai-index/
.cache/

# Node.js
studio/node_modules/
studio/.next/
studio/package-lock.json

# Environment files
studio/.env
studio/.env.local

# Logs
*.log
studio/firebase-debug.log

# Build files
studio/.cache/
EOF

git rm --cached -r .androidsdkroot/ -f
git rm --cached -r .emu/ -f
git rm --cached -r .codeoss-cloudworkstations/ -f
git rm --cached -r .idx/ -f
git rm --cached -r .monospace-ai-index/ -f
git rm --cached -r .cache/ -f
git rm --cached -r studio/node_modules/ -f
git add .gitignore
git commit -m "Remove large files and add comprehensive gitignore"
du -sh .git/du -sh .git/
du -sh .git/
clear
cp -r studio ~/studio-backup
rm -rf .git
git init
cat > .gitignore << EOF
# Android SDK and Emulator
.androidsdkroot/
.emu/

# IDE and System files
.codeoss-cloudworkstations/
.idx/
.monospace-ai-index/
.cache/

# Node.js
studio/node_modules/
studio/.next/
studio/package-lock.json

# Environment files
studio/.env
studio/.env.local

# Logs
*.log
studio/firebase-debug.log

# Build files
studio/.cache/
EOF

clear
git add .
git commit -m "Initial commit with all project files"
du -sh .git/
clear
git status
