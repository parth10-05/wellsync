import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        {/* Script to check theme before page loads to prevent flash */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Check if theme exists in localStorage
              const theme = localStorage.getItem('theme');
              // Check if user has dark mode preference
              const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              
              // Apply dark mode if explicitly set or system prefers dark + no localStorage override
              if (theme === 'dark' || (!theme && systemPrefersDark)) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark')
              }
            })()
          `
        }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
