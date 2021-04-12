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
}

export default new VacineController();
