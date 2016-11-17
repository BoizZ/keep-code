

## GITHUB experience collection


#### (1) How to run HTML directly on github ?
------------------------------------

1.终端里切换到你的工作目录

2.创建一个新的gh-pages分支

```
git checkout --orphan gh-pages
//新建一个gh-pages分支并且没有任何提交历史，不要--orphan也行
```

3.`git add`和`git commit`之后就可以正常push了

```
git push -u origin gh-pages
//或者
git push -u origin HEAD
```
4. 访问`https://[username].github.io/[repo]/[all url]`