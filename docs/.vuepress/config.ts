import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { plumeTheme } from "vuepress-theme-plume";

export default defineUserConfig({
  // 请不要忘记设置默认语言
  lang: "zh-CN",
  theme: plumeTheme({
    avatar: {
      url: "/ava.jpg",
      name: "怡然",
      description: "云间数点红，撞落我怀中",
      circle: true,
    },
    navbar: [
      { text: "首页", link: "/", icon: "solar:home-add-linear" },
      {
        text: "博客",
        link: "/blog/",
        icon: "ri:blogger-line",
      },
      {
        text: "基础",
        icon: "ph:file-html",
        items: [
          {
            text: "HTML",
            icon: "ph:file-html",
            link: "/notes/HTML/HTML基础.md",
          },
          {
            text: "CSS",
            icon: "ph:file-css",
            link: "/notes/CSS/CSS选择器.md",
          },
          {
            text: "JavaScript",
            icon: "ph:file-js",
            link: "/notes/JavaScript/JS常用方法.md",
          },
        ],
      },
      // {
      //   text: "框架",
      //   icon: "ph:file-vue-duotone",
      //   items: [
      //     {
      //       text: "Vue",
      //       icon: "ph:file-vue",
      //       link: "/notes/Vue/Vue组件自我调用.md",
      //     },
      //     {
      //       text: "React",
      //       icon: "mdi:react",
      //       link: "/前端框架/React",
      //     },
      //     {
      //       text: "UNIAPP",
      //       icon: "mdi:unicode",
      //       link: "/前端框架/UNIAPP",
      //     },
      //     {
      //       text: "微信小程序",
      //       icon: "ri:wechat-2-line",
      //       link: "/前端框架/WeChatApp",
      //     },
      //   ],
      // },
      // {
      //   text: "插件",
      //   icon: "clarity:plugin-line",
      //   items: [
      //     {
      //       text: "NPM",
      //       icon: "ph:file-vue",
      //       link: "/notes/Plugins/教程-Vue封装组件并发布到npm.md",
      //     },
      //     {
      //       text: "Element",
      //       icon: "mdi:react",
      //       link: "/notes/Plugins/Element-Table表头顺序错乱问题",
      //     },
      //   ],
      // },
      // {
      //   text: "其他",
      //   icon: "icon-park-outline:other",
      //   items: [
      //     {
      //       text: "Git",
      //       icon: "teenyicons:git-outline",
      //       link: "/notes/Git/Git Commit Message规范.md",
      //     },
      //   ],
      // },
    ],
    notes: {
      dir: "notes",
      link: "/",
      notes: [
        {
          dir: "HTML", // 声明笔记的目录，相对于 `notes.dir`
          link: "/HTML/", // 声明笔记的链接前缀
          sidebar: [
            // 配置侧边栏
            {
              text: "HTML基础",
              // icon: "ic:baseline-dashboard",
              items: ["HTML基础知识","HTML元素"],
            },
            // {
            //   text: "HTML问题",
            //   icon: "icon-park-outline:file-question",
            //   items: [],
            // },
            // {
            //   text: "HTML方案",
            //   icon: "icon-park-outline:plan",
            //   items: [],
            // },
          ],
        },
        // {
        //   dir: "CSS", // 声明笔记的目录，相对于 `notes.dir`
        //   link: "/CSS/", // 声明笔记的链接前缀
        //   sidebar: [
        //     // 配置侧边栏
        //     {
        //       text: "CSS基础",
        //       icon: "ic:baseline-dashboard",
        //       items: [
        //         "CSS选择器",
        //         "CSS3新增内容",
        //         "CSS-滚动条-Scrollbar",
        //         "样式滤镜 Filter",
        //         "网格布局 Grid",
        //       ],
        //     },
        //     {
        //       text: "CSS问题",
        //       icon: "icon-park-outline:file-question",
        //       items: [],
        //     },
        //     {
        //       text: "CSS方案",
        //       icon: "icon-park-outline:plan",
        //       items: ["CSS-文字轮播效果", "响应式布局方案"],
        //     },
        //   ],
        // },
        // {
        //   dir: "JavaScript", // 声明笔记的目录，相对于 `notes.dir`
        //   link: "/JavaScript/", // 声明笔记的链接前缀
        //   sidebar: [
        //     // 配置侧边栏
        //     {
        //       text: "JavaScript基础",
        //       icon: "ic:baseline-dashboard",
        //       items: [
        //         "JavaScript-作用域和闭包",
        //         "[JavaScript高级程序设计]读书笔记",
        //         "WebSocket",
        //         "内置对象方法",
        //         "原型链",
        //         "正则表达式",
        //         "ECMAScript6",
        //         "H5离线储存",
        //         "Promise",
        //         "PWA渐进式应用",
        //         "Set、Map、WeakSet和WeakMap",
        //       ],
        //     },
        //     {
        //       text: "JavaScript问题",
        //       icon: "icon-park-outline:file-question",
        //       items: ["笔记"],
        //     },
        //     {
        //       text: "JavaScript方案",
        //       icon: "icon-park-outline:plan",
        //       items: ["常用方法"],
        //     },
        //   ],
        // },
        // {
        //   dir: "Vue", // 声明笔记的目录，相对于 `notes.dir`
        //   link: "/Vue/", // 声明笔记的链接前缀
        //   sidebar: [
        //     // 配置侧边栏
        //     {
        //       text: "Vue方案",
        //       icon: "icon-park-outline:plan",
        //       items: ["Vue组件自我调用", "Vue事件总线使用"],
        //     },
        //   ],
        // },
        // {
        //   dir: "Plugins",
        //   link: "/Plugins/",
        //   sidebar: [
        //     {
        //       text: "插件封装",
        //       icon: "ic:baseline-dashboard",
        //       items: ["教程-Vue封装组件并发布到npm"],
        //     },
        //     {
        //       text: "Element",
        //       icon: "ic:baseline-dashboard",
        //       items: ["Element-Table表头顺序错乱问题"],
        //     },
        //   ],
        // },
        // {
        //   dir: "Git",
        //   link: "/Git/",
        //   sidebar: [
        //     {
        //       text: "Git使用",
        //       icon: "ic:baseline-dashboard",
        //       items: ["Git Commit Message规范"],
        //     },
        //     {
        //       text: "Git命令",
        //       icon: "ic:baseline-dashboard",
        //       items: ["Git常用命令"],
        //     },
        //   ],
        // },
      ],
    },
  }),
  bundler: viteBundler(),
});
