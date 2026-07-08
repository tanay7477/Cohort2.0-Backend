# 🧰 Git & GitHub Commands — Complete Scenario Guide

A practical reference for every common Git situation a developer faces — from daily commits to disaster recovery.

---

## 1️⃣ Basic Setup & Daily Workflow

```bash
git init                          # Naya repo initialize karna
git clone <url>                   # Existing repo clone karna
git status                        # Current changes/status dekhna
git add <file>                    # Specific file stage karna
git add .                         # Sab changes stage karna
git commit -m "message"           # Staged changes commit karna
git push                          # Local commits remote pe bhejna
git pull                          # Remote se latest changes lana
```

---

## 2️⃣ Renaming Files/Folders

```bash
git mv old-name new-name          # Rename + auto stage (recommended)
git add .                         # Agar manually (OS se) rename kiya ho
git commit -m "Renamed X to Y"
git push
```

---

## 3️⃣ Undoing Changes (Before Commit)

```bash
git restore <file>                # File ko last commit jaisa wapas karna (unstaged changes discard)
git restore --staged <file>       # File ko unstage karna (staged se hatana, changes rahenge)
git checkout -- <file>            # (Old syntax) same as restore
git clean -fd                     # Untracked files/folders delete karna (careful!)
```

---

## 4️⃣ Undoing Commits (After Commit, Before Push)

```bash
git commit --amend -m "new message"     # Last commit ka message ya content edit karna
git reset --soft HEAD~1                 # Last commit undo, changes staged reh jayenge
git reset --mixed HEAD~1                # Last commit undo, changes unstaged reh jayenge (default)
git reset --hard HEAD~1                 # Last commit + changes poori tarah delete (⚠️ dangerous)
```

---

## 5️⃣ Undoing Commits (After Push — Safe Way)

```bash
git revert <commit-hash>          # Purane commit ko cancel karne wala naya commit banata hai (safe, history preserve)
git revert HEAD                   # Sabse latest commit revert karna
git push
```
> `revert` hamesha `reset --hard` se safer hai jab kaam already push ho chuka ho, kyunki team ke saath kaam karte waqt history rewrite nahi hoti.

---

## 6️⃣ Merge Conflicts

```bash
git status                        # Konsi files conflict mein hain, dekhna
# Conflict wali files manually edit karo (<<<<<<< ======= >>>>>>> markers hatao)
git add .                         # Resolved files stage karna
git commit -m "Resolved merge conflict"
git push
```

**Agar conflict resolve nahi karna, wapas jaana hai:**
```bash
git merge --abort                 # Merge process cancel, pehle wali state pe wapas
```

---

## 7️⃣ Branch Management

```bash
git branch                        # Saari local branches list
git branch -a                     # Local + remote branches
git branch <name>                 # Nayi branch banana
git checkout <name>                # Branch switch karna
git checkout -b <name>            # Nayi branch bana ke turant switch
git branch -d <name>              # Branch delete (safe, merged hone par hi)
git branch -D <name>              # Branch force delete (⚠️ unmerged bhi delete)
git push origin --delete <name>   # Remote se branch delete karna
```

---

## 8️⃣ Merging Branches

```bash
git checkout main                 # Pehle target branch pe jao
git merge <branch-name>           # Dusri branch ko is mein merge karna
git rebase <branch-name>          # Linear history banane ke liye rebase (advanced)
```

---

## 9️⃣ Diverged Branches (Local & Remote Out of Sync)

*(Ye exactly wahi case hai jo tumhare saath hua tha)*

```bash
git pull                          # Pehle remote changes lao
# Agar conflict aaye:
git add .
git commit -m "Merged conflicting changes"
git push
```

**Agar local version hi final rakhna hai (remote overwrite karna hai):**
```bash
git push --force                  # ⚠️ Dangerous — remote history overwrite ho jayegi
```
> `--force` sirf tabhi use karo jab pakka pata ho remote pe kuch important nahi hai jo lose ho jayega.

---

## 🔟 Deleted Files/Folders Recovery

```bash
git checkout <commit-hash> -- <path>     # Purane commit se file/folder wapas lana
git log --diff-filter=D --summary        # Kaunsi files kab delete hui, dekhna
git log --all --full-history -- <path>   # Deleted file ki poori history dekhna
```

---

## 1️⃣1️⃣ Stashing (Temporary Save Without Commit)

```bash
git stash                         # Current changes temporarily save (working dir clean ho jati hai)
git stash list                    # Saari stashes dekhna
git stash pop                     # Latest stash wapas lagana + list se hata dena
git stash apply                   # Stash wapas lagana (list se nahi hatega)
git stash drop                    # Ek stash delete karna
git stash clear                   # Saari stashes delete
```

---

## 1️⃣2️⃣ Remote Repository Management

```bash
git remote -v                     # Konse remotes connected hain, dekhna
git remote add origin <url>       # Naya remote add karna
git remote set-url origin <url>   # Remote URL change karna
git fetch                         # Remote changes download (merge nahi karta)
```

---

## 1️⃣3️⃣ Viewing History

```bash
git log                           # Poori commit history
git log --oneline                 # Short/compact history
git log --oneline --graph --all   # Visual branch graph
git show <commit-hash>            # Specific commit ki details dekhna
git diff                          # Unstaged changes dekhna
git diff --staged                 # Staged changes dekhna
```

---

## 1️⃣4️⃣ .gitignore Related

```bash
git rm --cached <file>            # File ko tracking se hatana (delete nahi, sirf untrack)
git rm -r --cached .              # Sab kuch untrack karna (fir .gitignore follow karke re-add karo)
git add .
git commit -m "Applied .gitignore"
```

---

## 1️⃣5️⃣ Line Ending Warnings (LF/CRLF) — Jo tumhe aaya tha

Ye sirf warning hai, error nahi. Permanently fix karne ke liye:

```bash
git config --global core.autocrlf true      # Windows ke liye recommended setting
```

---

## 🚨 Emergency / Panic Situations

| Situation | Command |
|---|---|
| Galti se wrong branch pe commit kar diya | `git cherry-pick <hash>` (sahi branch pe le jao), fir `git reset --hard HEAD~1` wrong branch pe |
| Sab kuch messed up, fresh start chahiye (local) | `git fetch origin` → `git reset --hard origin/main` ⚠️ (local changes lose honge) |
| Commit message galat likh diya (push se pehle) | `git commit --amend -m "correct message"` |
| Accidentally sensitive file (jaise `.env`) commit ho gayi | `git rm --cached .env` → `.gitignore` mein add karo → commit + push |
| 2 branches diverge ho gayi (jaisa aapke saath hua) | `git pull` → conflicts resolve karo → `git add .` → `git commit` → `git push` |

---

## 💡 Golden Rules

1. Push karne se pehle hamesha `git status` check karo.
2. `--force` aur `reset --hard` bohot soch samajh ke use karo — ye data permanently delete kar sakte hain.
3. Team projects mein `revert` use karo, `reset --hard` ke baad `push --force` avoid karo.
4. Folder/file rename ke liye `git mv` use karo, manual OS rename se better hai.
5. Regularly commit karo — chhote, meaningful commits future troubleshooting easy banate hain.

---

*Reference banate raho, jab bhi confuse ho — yahi file check kar lena. 🚀*
