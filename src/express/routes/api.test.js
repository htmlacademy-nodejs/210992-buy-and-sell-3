const request = require(`supertest`);
const app = require(`../app`);


describe(`Тест API`, () => {

  test(`Получить все объявления`, async () => {
    const res = await request(app).get(`/api/offers`);
    expect(res.statusCode).toBe(200);
  });

  test(`Получить объявление ID l9rgq5`, async () => {
    const res = await request(app).get(`/api/offers/l9rgq5`);
    expect(res.statusCode).toBe(200);
  });

  test(`Получить комментарии объявления`, async () => {
    const res = await request(app).get(`/api/offers/l9rgq5/comments`);
    expect(res.statusCode).toBe(200);
  });

  test(`Проверка наличия полей в объявлении`, async () => {
    const res = await request(app).get(`/api/offers/l9rgq5`);
    expect(res.body).toHaveProperty(`id`);
    expect(res.body).toHaveProperty(`title`);
  });


  test(`Отправка нового объявления`, async () => {
    const res = await request(app)
      .post(`/api/offers`)
      .send({
        category: "категория",
        description: "описание",
        picture: "картинка",
        title: "заголовок",
        type: "тип объявления",
        sum: "стоимость",
        id: `l9rgq5`
      });

    const id = res.body.id;
    const offerResponse = await request(app).get(`/api/offers/${id}`);

    expect(offerResponse.body.id).toBe(`l9rgq5`);
  });

  test(`Отправка нового объявления с ошибкой`, async () => {
    const res = await request(app)
      .post(`/api/offers`)
      .send({
        category: "категория",
        description: "описание"
      });
    expect(res.statusCode).toBe(404);
  });

  test(`Удаление объявления по ID jCYi27`, async () => {
    const res = await request(app).delete(`/api/offers/jCYi27`);
    expect(res.statusCode).toBe(200);
  });
});

