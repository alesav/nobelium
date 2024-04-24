import Document, { Html, Head, Main, NextScript } from "next/document";
import cn from "classnames";
import { config } from "@/lib/server/config";
import tailwind from "@/tailwind.config";
import CJK from "@/lib/cjk";
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const initialColorScheme = {
      auto: "color-scheme-unset",
      dark: "dark",
    }[config.appearance];

    return (
      <Html lang={config.lang} className={cn(initialColorScheme)}>
        <Head>
          {config.font && config.font === "serif" ? (
            <>
              <link
                rel="preload"
                href="/fonts/SourceSerif.var.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
              />
              <link
                rel="preload"
                href="/fonts/SourceSerif-Italic.var.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
              />
            </>
          ) : (
            <>
              <link
                rel="preload"
                href="/fonts/IBMPlexSansVar-Roman.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
              />
              <link
                rel="preload"
                href="/fonts/IBMPlexSansVar-Italic.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
              />
            </>
          )}

          {["zh", "ja", "ko"].includes(
            config.lang.slice(0, 2).toLocaleLowerCase()
          ) && (
            <>
              <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
              />
              <link
                rel="preload"
                as="style"
                href={`https://fonts.googleapis.com/css2?family=Noto+${
                  config.font === "serif" ? "Serif" : "Sans"
                }+${CJK()}:wght@400;500;700&display=swap`}
              />
              <link
                rel="stylesheet"
                href={`https://fonts.googleapis.com/css2?family=Noto+${
                  config.font === "serif" ? "Serif" : "Sans"
                }+${CJK()}:wght@400;500;700&display=swap`}
              />
              <noscript>
                <link
                  rel="stylesheet"
                  href={`https://fonts.googleapis.com/css2?family=Noto+${
                    config.font === "serif" ? "Serif" : "Sans"
                  }+${CJK()}:wght@400;500;700&display=swap`}
                />
              </noscript>
            </>
          )}
          <link rel="icon" href="/favicon.png" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS 2.0"
            href="/feed"
          ></link>
          {config.appearance === "auto" ? (
            <>
              <meta
                name="theme-color"
                content={config.lightBackground}
                media="(prefers-color-scheme: light)"
              />
              <meta
                name="theme-color"
                content={config.darkBackground}
                media="(prefers-color-scheme: dark)"
              />
            </>
          ) : (
            <meta
              name="theme-color"
              content={
                config.appearance === "dark"
                  ? config.darkBackground
                  : config.lightBackground
              }
            />
          )}
          {/* To ensure the initial background color follows media preference when ThemeProvider is
              not ready */}
          <style>
            {`
            .color-scheme-unset, .color-scheme-unset body {
              background-color: ${tailwind.theme.extend.colors.day.DEFAULT} !important;
            }
            @media (prefers-color-scheme: dark) {
              .color-scheme-unset, .color-scheme-unset body {
                background-color: ${tailwind.theme.extend.colors.night.DEFAULT} !important;
              }
            }
          `}
          </style>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
                ym(97116058, "init", {
                      clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true,
                      webvisor:true
                });
              `,
            }}
          />
          <noscript>
            <div>
              <img
                src="https://mc.yandex.ru/watch/97116058"
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
              />
            </div>
          </noscript>

          <span id="wts2157992"></span>
          <script
            dangerouslySetInnerHTML={{
              __html: `  var wts=document.createElement(&quot;script&quot;);wts.async=true;
          wts.src=&quot;https://app.ardalio.com/log7.js&quot;;document.head.appendChild(wts);
          wts.onload = function(){wtslog7(2157992, 1)};`,
            }}
          />
          <noscript>
            <a href="https://www.web-stat.com">
              <img
                src="https://app.ardalio.com/7/1/2157992.png"
                alt="Web-Stat web statistics"
              />
            </a>
          </noscript>
        </Head>
        <body className="bg-day dark:bg-night">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
