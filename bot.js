import TOKEN from './token.js';
import { send } from './commands.js';
import { Telegraf, Markup } from 'telegraf';
import { message } from 'telegraf/filters';
// import axios from 'axios';
import { readFile } from 'fs/promises';

//🔑 Fetch BOT TOKEN
const bot = new Telegraf(TOKEN);

//⚙️ Bot commands
bot.telegram.setMyCommands(send.commands);
bot.start((ctx) => ctx.reply(send.welcomeMessage));

//❔ А нужно ли нам еще одно меню вообще?
// bot.start((ctx) =>
//   ctx.reply(
//     send.welcomeMessage,
//     Markup.keyboard([['🐈 Прислать кота', '📜 Список команд']]).resize()
//   )
// );

bot.help((ctx) => ctx.reply(send.helpMessage));
// bot.hears('📜 Список команд', async (ctx) => {
//   await ctx.reply(send.helpMessage);
// });

//🐈 Sending cat pics
const sendCatPic = async (ctx) => {
  try {
    // const response = await axios('https://cataas.com/cat');
    // await ctx.telegram.sendPhoto(ctx.chat.id, response.data.url);
    await ctx.replyWithPhoto(
      { url: 'https://cataas.com/cat' },
      {
        ...Markup.inlineKeyboard([Markup.button.callback('Ещё кота!', 'newCat')]),
      }
    );
  } catch (error) {
    console.error(error);
    await ctx.reply('Не получилось прислать кота :(');
  }
};

bot.command('cat', async (ctx) => {
  await sendCatPic(ctx);
});
// bot.hears('🐈 Прислать кота', async (ctx) => {
//   await sendCatPic(ctx);
// });
bot.action('newCat', async (ctx) => {
  await ctx.answerCbQuery();
  await sendCatPic(ctx);
});

const randomInt = (min, max) => Math.round(Math.random() * max + min);
//🤡 Sending random meme
const sendMeme = async (ctx) => {
  try {
    const linksList = (await readFile('./pic-links.txt', 'utf-8')).split('\n');
    await ctx.replyWithPhoto(
      { url: linksList.at(randomInt(0, linksList.length)) },
      {
        ...Markup.inlineKeyboard([Markup.button.callback('Ещё мем!', 'newMeme')]),
      }
    );
  } catch (error) {
    console.error(error);
    await ctx.reply('Не получилось прислать мем :(');
  }
};

bot.command('meme', async (ctx) => {
  await sendMeme(ctx);
});
bot.action('newMeme', async (ctx) => {
  await ctx.answerCbQuery();
  await sendMeme(ctx);
});

//📨 Other messages
bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();
console.log('🥳 Bot is running!');

//🛑 Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
