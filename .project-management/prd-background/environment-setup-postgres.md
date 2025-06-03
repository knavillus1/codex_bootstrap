---
Include reference to this file in 
---
# postgres environment setup for install.sh maintenance
- This setup script has been demonstrated to work: 
```
apt-get update -qq
apt-get install -yqq postgresql

pg_ctlcluster --skip-systemctl-redirect 16 main start
su - postgres -c "createuser -s $(whoami)"
#verify
pg_ctlcluster 16 main status
psql -U $(whoami) -d postgres -c "SELECT version();"
```