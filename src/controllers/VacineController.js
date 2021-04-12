class VacineController {
  index(request, response) {
    return response.status(200).json([
      {
        name: "Vacine COVID-19",
        date: "20/11/2020",
        schedule: "15/11/2020 as 15:15 a 15:30 horas",
      },
    ]);
  }

  indexDates(request, response) {
    return response
      .status(200)
      .json([
        "10/11/2020",
        "11/11/2020",
        "12/11/2020",
        "15/11/2020",
        "16/11/2020",
      ]);
  }

  indexSchedules(request, response) {
    return response
      .status(200)
      .json([
        "15:00 as 15:15 horas",
        "15:15 as 15:30 horas",
        "16:15 as 16:15 horas",
        "16:15 as 16:30 horas",
      ]);
  }

  store(request, response) {
    return response.status(201).json({
      message: "Attendance registered",
      date: request.body.date,
      schedule: request.body.schedule,
    });
  }
}

export default new VacineController();
