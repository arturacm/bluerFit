import puppeteer from "puppeteer";
import { NextApiRequest, NextApiResponse } from "next";

function logRequest(interceptedRequest) {
  console.log("A request was made:", interceptedRequest.url());
}

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://mobile.bluefitacademia.com.br/");
  page.on("request", logRequest);

  await page.type("#cpf", "A VALID CPF HERE");
  await page.type("#ano", "CORESPONDING YEAR");
  await page.click(".btn");

  await page.waitForSelector(".title1");

  const pageContent = await page.evaluate(() => {
    const allFields = document.querySelectorAll("font");
    const links = [];
    document.querySelectorAll("a").forEach((element) => {
      links.push(element.href);
    });

    return {
      aluno: allFields[0].innerHTML.split("&nbsp;")[1],
      cod: allFields[1].innerHTML.split("&nbsp;")[1],
      treino: allFields[2].innerHTML.split("&nbsp;")[1],
      professor: allFields[3].innerHTML.split("&nbsp;")[1],
      links,
    };
  });
  //   console.log(pageContent);

  await page.goto(pageContent.links[1]);
  const routine = await page.evaluate(() => {
    const data = [];
    document.querySelectorAll(".alert").forEach((element: HTMLElement) => {
      const items = [];
      element.innerText.split("\n").forEach((item) => {
        items.push(...item.split("\xa0"));
      });
      data.push(items);
    });

    return data;
  });
  //   console.log(routine[0]);

  await browser.close();
  res.send({ pageContent, routine });
};

export default handler;
