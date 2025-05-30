INSERT INTO `feedback`(`id`, `text`, `name`) VALUES (1,"Девочки, кто в Мозыре живет, у вас крутой мастер 
    совсем рядом. Маша оценит ваш скальп под микроскопом, 
    изучит структуру и проведет тесты с волосами, определит 
    ваш тип волос и его проблему, напитает. Расскажет как 
    и чем устроить салонный уход на дому. На заметку тем, 
    кто старается отрастить волосы. 
    Короче, мой рекомендасьен.","Виктория");
    INSERT INTO `feedback`(`id`, `text`, `name`) VALUES (2,"Спасибо за пилинг, кожа стала чище и как-то проще стало, не так быстро теряется свежесть волос, кожа стала дышать, расчесывать легче. Мне понравилось. Спасибо за консультацию и диагностику трихоскопом. Мне все понравилось и было интересно. Много полезной информации я получила для себя.","Мария");
        INSERT INTO `feedback`(`id`, `text`, `name`) VALUES (3,"Мария, еще раз хочу тебя поблагодарить. Я так давно себе не нравилась как с “новыми” волосами”! Я твоя навеки!
    Ты большая молодец! Видно, как ты любишь волосы, как ты к ним относишься, с каким трепетом и кропотливостью все делаешь.","Елена");
            INSERT INTO `feedback`(`id`, `text`, `name`) VALUES (4,"Огромное вам спасибо, Маша, за мои шикарные 
волосы!!! Каждую минуту вспоминаю вас самыми 
добрыми и теплыми словами! Мои волосы потрясающе 
выглядят благодаря вам!!! Я просто в восторге 
от результата. Волосы идеально ровные, гладкие, 
никакой пушистости, мне ооооочень нравится!)))","Александра");
            INSERT INTO `feedback`(`id`, `text`, `name`) VALUES (5,"После процедуры прошло уже 3 месяца, а волосы так и остались нереально классными! 
    Это все Машуня!","Наталья");
                INSERT INTO `feedback`(`id`, `text`, `name`) VALUES (6,"Мария, хочу Вас поблагодарить за шикарные волосы, 
они стали очень напитанные, блестящие и визуально 
очень аккуратные. Не могу налюбоваться теперь. Уже 
начала получать первые комплименты. Очень рада, что попала к такому опытному мастеру. Буду теперь точно обращаться еще.","Ольга");
                INSERT INTO `feedback`(`id`, `text`, `name`) VALUES (7,"Огромное спасибо Маше. Чудесный мастер и профессионал своего дела! Волосы нереально мягкие, гладкие и блестящие. Я в космосе от процедуры и процесса.
Просто очуметь! Маша, ты - моя фея!","Екатерина");

INSERT INTO `type`(`id`, `name`) VALUES (1,"Услуги по восстановлению волос");

INSERT INTO `services`(`id`, `name`, `cost`, `minCost`, `maxCost`, `typeId`, `descTitle`, `descContent`, `descComment`) VALUES (1,"Стрижка",NULL, 7,32,NULL,"Стоимость стрижки зависит от длины волос",NULL,"* Подравнивание кончиков во время процедуры для постоянных клиентов - бесплатно.");
INSERT INTO `services`(`id`, `name`, `cost`, `minCost`, `maxCost`, `typeId`, `descTitle`, `descContent`, `descComment`) VALUES (2,"Окрашивание",NULL, 60,NULL,NULL,"Окрашивание",NULL,"* Стоимость услуги зависит от длины и густоты волос.");
INSERT INTO `services`(`id`, `name`, `cost`, `minCost`, `maxCost`, `typeId`, `descTitle`, `descContent`, `descComment`) VALUES (3,"Кератин",NULL, 110,220,1,"Что дадут вам эти процедуры?*","Идеальные волосы от 3 до 8 месяцев. Блеск, мягкость и гладкость волос. Выпрямление волос от “легкой волны” до “афро”. Избавит от пушистости и “елки”.",NULL);
INSERT INTO `services`(`id`, `name`, `cost`, `minCost`, `maxCost`, `typeId`, `descTitle`, `descContent`, `descComment`) VALUES (4,"Ботокс",NULL, 110,220,1,"Что дадут вам эти процедуры?*","Идеальные волосы от 3 до 8 месяцев. Блеск, мягкость и гладкость волос. Выпрямление волос от “легкой волны” до “афро”. Избавит от пушистости и “елки”.",NULL);
INSERT INTO `services`(`id`, `name`, `cost`, `minCost`, `maxCost`, `typeId`, `descTitle`, `descContent`, `descComment`) VALUES (5,"СПА уход",NULL, 60,85,1,"Что дадут вам эти процедуры?*","Идеальные волосы от 3 до 8 месяцев. Блеск, мягкость и гладкость волос. Выпрямление волос от “легкой волны” до “афро”. Избавит от пушистости и “елки”.",NULL);
INSERT INTO `services`(`id`, `name`, `cost`, `minCost`, `maxCost`, `typeId`, `descTitle`, `descContent`, `descComment`) VALUES (6,"Полировка волос",NULL, 40,70,1,"Что дадут вам эти процедуры?*","Устранение секущихся кончиков по всей длине волос. Волосы приобретают более здоровый вид. Рекомендуется выполнять каждые 3 месяца.",NULL);
INSERT INTO `services`(`id`, `name`, `cost`, `minCost`, `maxCost`, `typeId`, `descTitle`, `descContent`, `descComment`) VALUES (7,"Холодное восстановление",NULL, 90,130,1,"Что дадут вам эти процедуры?*","Идеальные волосы от 1 до 3 месяцев. Волосы восстанавливаются изнутри, уплотняются, становятся гладкими, шелковистыми и блестящими.",NULL);
INSERT INTO `services`(`id`, `name`, `cost`, `minCost`, `maxCost`, `typeId`, `descTitle`, `descContent`, `descComment`) VALUES (8,"Пилинг кожи головы",NULL, 50,NULL,1,"Что дадут вам эти процедуры?*","Стимуляция роста, глубокое ощищение, устранение перхоти. Рекомендуется курс из трех процедур повторением один раз в полторы - четыре недели.",NULL);

INSERT INTO `descriptionItem`(`id`, `name`, `cost`, `minCost`, `maxCost`, `serviceId`) VALUES (1,"Кератин",7,NULL,NULL,1);
INSERT INTO `descriptionItem`(`id`, `name`, `cost`, `minCost`, `maxCost`, `serviceId`) VALUES (2,"Короткая длина",20,NULL,NULL,1);
INSERT INTO `descriptionItem`(`id`, `name`, `cost`, `minCost`, `maxCost`, `serviceId`) VALUES (3,"Средняя длина",27,NULL,NULL,1);
INSERT INTO `descriptionItem`(`id`, `name`, `cost`, `minCost`, `maxCost`, `serviceId`) VALUES (4,"Длиные волосы",32,NULL,NULL,1);
INSERT INTO `descriptionItem`(`id`, `name`, `cost`, `minCost`, `maxCost`, `serviceId`) VALUES (5,"Подравнивание кончиков*",12,NULL,NULL,1);
INSERT INTO `descriptionItem`(`id`, `name`, `cost`, `minCost`, `maxCost`, `serviceId`) VALUES (6,"Мелирование кончиков*",NULL,80,NULL,2);
INSERT INTO `descriptionItem`(`id`, `name`, `cost`, `minCost`, `maxCost`, `serviceId`) VALUES (7,"Контуринг",NULL,55,NULL,2);
INSERT INTO `descriptionItem`(`id`, `name`, `cost`, `minCost`, `maxCost`, `serviceId`) VALUES (8,"Окрашивание волос тон в тон",NULL,60,NULL,2);