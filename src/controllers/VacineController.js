class VacineController {
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
}

export default new VacineController();
