const commandsList = [
  {
    command: "start",
    description: "Запуск бота"
  },
  {
    command: "help",
    description: "Показать все доступные команды"
  },
  {
    command: "cat",
    description: "Прислать случайное фото кота"
  },
  {
    command: "meme",
    description: "Прислать случайный мем"
  }
];

const welcomeText = `
  Привет! Я тестовый бот и пока мало что умею.
  Вот некоторые из моих команд:
  /help - список всех моих команд
  /cat - прислать случайное фото кота
  /meme - прислать случайный мем
`;

const helpText = () => {
  const list = commandsList.map(( item ) => `/${item.command} - ${item.description}`);
  return `Вот список всех доступных команд:\n${list.join('\n')}`
};

export const send = {
  welcomeMessage: welcomeText,
  helpMessage: helpText(),
  commands: commandsList
};
