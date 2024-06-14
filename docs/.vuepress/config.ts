import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { plumeTheme } from "vuepress-theme-plume";

export default defineUserConfig({
  // 请不要忘记设置默认语言
  lang: "zh-CN",
  base:'/',
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
        ],
      },
      {
        text: "框架",
        icon: "mdi:electron-framework",
        items: [
          {
            text: "Vue3",
            icon: "mingcute:vue-fill",
            link: "/notes/Vue3/Vue3基础.md"
          }
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
              items: ["HTML基础知识","HTML元素A-C","HTML元素D-F","HTML元素H-L","HTML元素M-S","HTML元素T-X","table及相关元素","input元素"],
            },
          ],
        },
        {
          dir: "CSS", 
          link: "/CSS/", 
          sidebar: [
            {
              text: "CSS基础",
              items: ["CSS选择器","CSS3新增内容","Grid网格布局"],
            },
          ],
        },
        {
          dir: "JavaScript", 
          link: "/JavaScript/", 
          sidebar: [
            {
              text: "JavaScript基础",
              items: ["JS基础","JS常用方法","webSocket"],
            },
          ],
        },
        {
          dir: "Vue3", 
          link: "/Vue3/", 
          sidebar: [
            {
              text: "Vue3学习笔记",
              items: ["Vue3基础","Vue3核心语法"],
            },
          ],
        },
      ],
    },
    plugins: {
      markdownEnhance: {
        demo: true
      }
    }
  }),
  bundler: viteBundler(),
});
