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
        icon: "ph:file-html",
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
              items: ["HTML基础知识","HTML元素"],
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