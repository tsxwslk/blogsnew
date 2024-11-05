import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { plumeTheme } from "vuepress-theme-plume";

export default defineUserConfig({
  lang: "zh-CN",
  base: "/",
  title: "泠泠彻夜的笔记",
  port: 7089,
  theme: plumeTheme({
    hostname: "http://www.iyuwb.com/",
    avatar: {
      url: "/ava.jpg",
      name: "怡然",
      description: "云间数点红，撞落我怀中",
      circle: true,
    },
    navbar: [
      { text: "首页", link: "/", icon: "solar:home-add-linear" },
      {
        text: "笔记",
        link: "/blog/",
        icon: "ri:blogger-line",
      },
      {
        text: "基础",
        icon: "arcticons:my-base",
        items: [
          {
            text: "HTML",
            icon: "ph:file-html",
            link: "/notes/HTML/HTML基础知识.md",
          },
          {
            text: "CSS",
            icon: "ph:file-css",
            link: "/notes/CSS/CSS选择器.md",
          },
          {
            text: "JavaScript",
            icon: "ph:file-js",
            link: "/notes/JavaScript/JS基础.md",
          },
          {
            text: "TypeScript",
            icon: "nonicons:typescript-16",
            link: "/notes/TypeScript/TypeScript简介.md",
          },
        ],
      },
      {
        text: "框架",
        icon: "mdi:electron-framework",
        items: [
          {
            text: "Vue3",
            icon: "mingcute:vue-fill",
            link: "/notes/Vue3/Vue3基础.md",
          },
          {
            text: "uniapp",
            icon: "ph:union",
            link: "/notes/uniapp/uniapp基础.md",
          },
        ],
      },
      {
        text: "其他",
        icon: "material-symbols:other-admission-outline",
        items: [
          {
            text: "插件",
            icon: "mingcute:plugin-2-line",
            link: "/notes/Plugin/Animate动画库.md",
          },
          {
            text: "算法题",
            icon: "simple-icons:leetcode",
            link: "/notes/leetcode/leetCode01.md",
          },
        ],
      },
    ],
    notes: {
      dir: "notes",
      link: "/",
      notes: [
        {
          dir: "HTML",
          link: "/HTML/",
          sidebar: [
            {
              text: "HTML基础",
              items: [
                "HTML基础知识",
                "HTML元素A-C",
                "HTML元素D-F",
                "HTML元素H-L",
                "HTML元素M-S",
                "HTML元素T-X",
                "table及相关元素",
                "input元素",
              ],
            },
          ],
        },
        {
          dir: "CSS",
          link: "/CSS/",
          sidebar: [
            {
              text: "CSS基础",
              items: ["CSS选择器", "CSS3新增内容", "Grid网格布局"],
            },
          ],
        },
        {
          dir: "JavaScript",
          link: "/JavaScript/",
          sidebar: [
            {
              text: "JavaScript基础",
              items: ["JS基础", "JS常用方法", "webSocket"],
            },
          ],
        },
        {
          dir: "TypeScript",
          link: "/TypeScript/",
          sidebar: [
            {
              text: "TypeScript学习笔记",
              items: [
                "TypeScript简介",
                "TypeScript类型",
                "TypeScript数组",
                "TypeScript的symbol类型",
                "TypeScript函数类型",
                "TypeScript的对象类型",
                "TypeScript的interface接口",
                "TypeScript的class类型",
              ],
            },
          ],
        },
        {
          dir: "Vue3",
          link: "/Vue3/",
          sidebar: [
            {
              text: "Vue3基础学习笔记",
              items: [
                "Vue3基础",
                "Vue3基础核心语法",
                "Vue3路由",
                "Vue3状态管理工具pinia",
                "Vue3组件通信",
                "其他常用API",
              ],
            },
          ],
        },
        {
          dir: "uniapp",
          link: "/uniapp/",
          sidebar: [
            {
              text: "uniapp学习笔记",
              items: ["uniapp基础", "uniapp组件", "uniapp生命周期"],
            },
          ],
        },
        {
          dir: "Plugin",
          link: "/Plugin/",
          sidebar: [
            {
              text: "常用插件",
              items: ["Animate动画库"],
            },
          ],
        },
        {
          dir: "leetcode",
          link: "/leetcode/",
          sidebar: [
            {
              text: "算法题学习",
              items: ["leetCode01"],
            },
          ],
        },
      ],
    },
    plugins: {
      markdownEnhance: {
        demo: true,
      },
    },
  }),
  bundler: viteBundler(),
});
