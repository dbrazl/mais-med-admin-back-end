class MedicinesController {
  index(request, response) {
    const pharms = [
      {
        name: "Dipirona 100mg",
        quantity: 155,
      },
      {
        name: "Paracetamol 100mg",
        quantity: 52,
      },
      {
        name: "Ritalina 100mg",
        quantity: 10,
      },
      {
        name: "Vacina COVID-19",
        quantity: 100,
      },
    ];

    return response.status(200).json(pharms);
  }
}

export default new MedicinesController();
