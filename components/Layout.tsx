import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "BLUERfit" }: Props) => (
  <div className=" h-screen flex flex-col">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className="flex justify-center">
      <nav>
        <span>BluerFit</span>
      </nav>
    </header>
    <main className=" flex-auto bg-slate-400">{children}</main>
    <footer>
      <hr />
      <span>
        criado por{" "}
        <a href="http://linkedin.com/in/artur-moreira">Artur Moreira</a>
      </span>
    </footer>
  </div>
);

export default Layout;
