#这是一个项目
##非常NB的项目
###我就是一个程序员
## [开源协议之间的区别] (https://www.zhihu.com/question/19568896?sort=created)

##用（传统方式）命令行把修改过后的代码上传到码云？
1.git add .
2.git commit -m "提示信息"
3.git push


##制作首页App组件
1.完成Header区域，使用的是Mint-ui中的Header组件
2.制作底部的Tabbar区域，使用的是MUI的Tabbar.html
    +在制作购物车小图标时，操作会相对多一些
    +先把扩展图标的css样式拷贝到项目中
    +拷贝扩展的字体库ttf文件到项目中
    +为购物车小图标，添加如下样式"mui-icon mui-icon-extra mui-icon-extra-cart"
3.要在中间区域放置一个router-view来展示路由匹配到的组件


##改造tabbar为router-link
    +1.1导入路由的包
    +1.2安装路由
    +1.3导入自己的router.js模块
    +1.4挂载路由对象到vue实例
    +1.5把a标签改为router-link
    +1.6把href改为to="/***"
##设置路由高亮
    +1.1去掉默认的mui-ative类
    +1.2在路由对象中添加linkActiveClass: 'mui-active' （覆盖默认高亮的类，默认的类叫做router-link-active）
##点击tabbar中的路由链接展示对应的路由组件
    +1.1创建一个components文件夹，在文件夹下创建四个vue组件
    +1.2在router.js中导入四个组件
    +1.3在routes配置路由规则
    +1.4在App.vue中设置router-view展示


##制作首页轮播图
    +1.1在mui中找到mt-swipe轮播图标签
    +1.2给它设置一个高度，需要找到它的类mint-swipe
    +1.3给每个div展示区的mint-swipe-item类添加样式
##加载首页轮播图数据
    +1.1获取数据，如何获取数据，使用vue-resource
    +1.2使用this.$http.get("http://www.liulongbin.top:3005/api/getlunbo")获取数据
    +1.3获取到的数据要保存到data身上
    +1.4使用v-for循环渲染每个item对象，必须加:key
    +1.5给每个mt-swipe-item加上img并且链接为:src="item.img"，最后修改图片大小，注意类名


##改造九宫格区域样式
    +1.1在mui中找到九宫格样式
    +1.2找到ul，li的类去掉boder
    +1.3将默认的图标换成自己的图片
    +1.4设置图片大小和字体大小


##改造新闻链接
1.把新闻链接的 a 标签换成 router-link ，把 href 改为 to。
2.创建一个新的 vue组件 ，添加到 router.js 中 匹配上规则。
##新闻资讯页面制作
1.绘制界面，使用mui中的media-list.html
2.使用vue-resource 获取数据
3.渲染真实数据


##实现新闻资讯列表点击跳转到新闻详情
1.把列表中的每一项改造成router-link，同时，在跳转的时候应该提供唯一的id标识符
2.创建新闻详情的组件页面，newsinfo.vue
3.在路由模块中，将新闻详情的路由地址和组件页面对应起来


##实现 新闻详情 的 页面布局 和数据渲染
1.页面布局就用普通的css
2.创建一个方法请求数据，data中接收数据，created调用方法，将数据放到页面中去


##单独封装一个comment.vue评论子组件
1.先创建一个单独的 comment.vue 组件模板
2.在需要使用comment组件的页面中，先手动导入 comment 组件
 +'import comment from './comment.vue''
3.在父组件中使用components属性，将刚才导入的comment组件，注册为自己的子组件
4.将注册子组件的，注册名称，以标签的形式，在页面中引用即可


##获取所有的评论显示到页面中
1.创建一个方法请求数据，data中接收数据，created调用方法，将数据放到页面中去


##实现点击加载更多评论的功能
1.给按钮添加点击事件，在事件中请求下一页数据（pageindex加1，再调用this.getComments()，重新加载新的数据）
2.为了防止新数据覆盖老数据的情况，我们在点击加载更多时，每当获取到新数据，应该让老数据调用concat()方法，拼接上新数据


##发表评论
1.把文本框做双向数据绑定
2.为发表按钮绑定事件
3.校验评论内容是否为空，若为空，提示用户评论内容不能为空
4.通过vue-resource发送一个请求，把评论内容提交给服务器
5.当发表评论后，刷新列表，以查看最新评论
    +如果调用getComments方法刷新列表，可能只能得到最后一页的评论，评论前几页的评论获取不到
    +处理方法：当我们评论成功后，在客户端手动拼接处一个最新的评论对象，然后再调用unshift方法，追加到data中的commentList开头。


##分享图片
1.把图片分享的 a 标签换成 router-link ，把 href 改为 to。
2.创建一个新的 vue组件 ，添加到 router.js 中 匹配上规则。
##绘制图片列表组件结构，并美化样式
1.制作顶部的滑动条【tab-top-webview-main】
    +制作顶部滑动条的坑：
        1.需要把slider区域的mui-fullscreen类去掉
        2.滑动条无法正常的滑动，这是一个js组件，需要被初始化一下
            +1.导入mui.js
            +2.调用官方提供的方式初始化
            【mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });】
        3.我们在初始化滑动条的时候，导入的mui.js，但是控制台报错【'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them】
            +mui.js中可能用到了'caller', 'callee', and 'arguments'，webpack打包好的bundle.js中，默认严格模式中不允许使用
            +解决方案：
            1.把mui.js中的非严格模式代码改掉【不现实】
            2.把webpack打包时候的严格模式禁用掉
                +cnpm install babel-plugin-transform-remove-strict-mode
                +.babelrc中的"plugins"添加"transform-remove-strict-mode"
        4.刚进入图片分享页面，滑动条无法正常滑动。如果要滑动，就要等到DOM元素加载完毕。所以要把初始化滑动条放到mounted钩子函数中
        5.当滑动条完成后，tabbar无法正常工作，这时我们需要把每个tabbar的【mui-tab-item】类，改一个类名【mui-tab-item1】，并且把每个与【mui-tab-item】类相关的css样式粘贴到新的【mui-tab-item1】中，就完成了
        6.获取所有分类，并渲染分类列表
2.制作底部的图片列表
    +图片列表需要使用懒加载技术。可以使用mint-ui提供现成的组件【lazy-load】
    +根据lazy-load的使用文档，尝试使用
    +渲染图片列表数据


##实现了点击图片跳转到图片详情页面
1.在改造li成router-link时，需要使用【tag】属性指定要渲染为那种元素
##实现 详情页面 的布局和 获取数据渲染
1.把 a 标签换成 router-link ，把 href 改为 to。
2.创建一个新的 vue组件 ，添加到 router.js 中 匹配上规则。【注意id】
3.【注意】在photoinfo中导入评论子组件，（1）导入组件（2）在component上注册组件（3）渲染到页面中
##实现图片详情中的缩略图功能
1.使用vue-preview这个插件（安装，main.js配置）
2.使用<vue-preview :slides="list"></vue-preview>渲染到页面（list为获取的数组，用foreach添加到数组中）
3.注意：每个图片对应的对象，必须有w和h和msrc属性
【今天遇到的问题】
【package.json】不知道怎么突然没了
【1.重新复制一份，注意name和main属性】
【2.可以npm init，重新初始化一个】


##绘制商品列表基本结构并美化
1.找到HomeContainer.vue，a改router-link，href改to
2.router.js中配置一下
3.绘制界面
4.【注意flex使用】   
    display: flex;
    /* 改变主轴方向为y轴 */
    flex-direction: column;
    justify-content: space-between;


##尝试在手机上进行项目的预览和测试
1.要保证自己的手机和开发项目的电脑，在同一个wifi下，也就是说，手机可以访问到电脑的ip
2.打开自己的项目中package.json文件，在dev脚本中，添加一个--host指令，把当前电脑的wifi ip地址，设置为--host的指令值
    +如何查看自己的电脑所处的wifi的ip呢？在cmd终端运行'ipconfig',查看无线网的ip地址


##商品购买详情
1.【点击加载更多】
    +this.goodslist = this.goodslist.concat(result.body.message)
    +getMore()
2.【编程式导航】
    +1.这是最简单的跳转
        this.$router.push('/home/goodsinfo/:id');
    +2.传递对象
        this.$router.push({path: '/home/goodsinfo/:id'})
    +3.传递一个命名的路由
        this.$router.push({name:'goodsinfo',params:{id:id}});
3.【抽离轮播图组件】
    +【100%宽】和【自适应宽】用:class="{'full':isfull}"
    + 使用props:['swipeList','isfull'],父组件必须向子组件穿这些值


##加入购物车动画
1.【
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
   】
   【
   beforeEnter(el){}
   enter(el,done){...;done()}
   afterEnter(el){}
   】
2.想要获取自身的标签元素，加上ref="ball"，js中通过this.$refs.ball获取dom
3.getBoundingClientRect()获取坐标
##购买数量的变化
1.子组件向父组件传值(事件调用)
    +1.定义一个方法getSelectedCount(count)，将子组件传来的值用count接收
    +2.子组件绑定change事件，只要数量发生变化，就立刻传值给父组件【this.$emit('getcount', parseInt(this.$refs.number.value));//传值给父组件】
2.父组件向子组件传值(属性传值)
    +1.父组件绑定一个属性【:max="goodsinfo.stock_quantity"】需要传过去的值
    +2.子组件先用【props:["max"],//接收父组件传来的最大库存数量】，然后用watch监听属性的变化，然后给value值设置max【mui(".mui-numbox").numbox().setOption('max',newVal)】

###Vuex
1、是为了保存组件之间共享数据而诞生的，如果组件之间有要共享的数据，可以直接挂载到vuex中，而不必通过父子组件之间的传值了。如果组件的数据不需要共享，此时，这些不需要共享的私有数据，就不必挂载到vuex中
2、props【存放父组件传递的数据】           data【存放私有数据】           vuex【存放共享的数据。是一个全局的共享数据存储区域，相当于一个数据仓库】
3、【配置步骤】
    +1.运行【cnpm i vuex -s】
    +2.导入包【import Vuex from 'vuex'】
    +3.注册vuex到vue中【Vue.use(Vuex)】
    +4.【new Vue.Store({
        state:{data},     【用this.$store.state.***来访问】
        mutations:{methods},
        getters:{只负责对外提供数据，不负责修改数据，如果要修改去mutations}【和过滤器类似，把原数据做了包装提供给调用者】【和computed类似，只要state中的值发生了变化，getters也正好引用了这个值，那么就会立即触发getters的重新求值】
    })】实例，得到一个仓储对象
    +5.挂载到vm实例上【store】
#总结
1、state中的数据，不能直接修改，如果想要修改，必须通过mutations
2、如果组件想要从state上获取数据，需要this.$store.state.***
3、如果组件想要修改数据，必须使用mutation提供的方法，需要通过this.$store.commit("方法名称",唯一的一个参数)
4、如果store中的state上的数据，在对外提供的时候，需要做一层包装，那么，推荐使用getters。如果需要使用getters，则用this.$store.getters.***