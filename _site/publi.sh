# publi.sh
# change the branch names appropriately
git checkout xshelp
rm -rf _site/
jekyll build
git add --all
git commit -m "`date`"
git push origin xshelp
cp -R _site ..
git checkout master
cp -R ../_site/* .
git add --all
git commit -m "`date`"
git push origin master
rm -rf ../_site/
git checkout xshelp
