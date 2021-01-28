class PharmsController {
  index(request, response) {
    const { medicineName } = request.params;

    const pharms = [
      {
        name: "Drogaria BelaMais",
        distance: 500,
        neighborhood: "Bela Vista",
        location: {
          latitude: 1.0,
          longitude: 1.0,
        },
        medicines: [
          {
            name: "Dipirona 100mg",
            quantity: 50,
          },
          {
            name: "Vacina COVID-19",
            quantity: 2,
          },
        ],
      },
      {
        name: "Drogaria Eucaliptal",
        distance: 1100,
        neighborhood: "Eucaliptal",
        location: {
          latitude: 1.0,
          longitude: 1.0,
        },
        medicines: [
          {
            name: "Paracetamol 100mg",
            quantity: 152,
          },
          {
            name: "Vacina COVID-19",
            quantity: 200,
          },
          {
            name: "Dipirona 100mg",
            quantity: 75,
          },
          {
            name: "Ritalina 100mg",
            quantity: 20,
          },
        ],
      },
      {
        name: "Drogaria Retiro",
        distance: 251,
        neighborhood: "Conforto",
        location: {
          latitude: 1.0,
          longitude: 1.0,
        },
        medicines: [
          {
            name: "Paracetamol 100mg",
            quantity: 63,
          },
          {
            name: "Vacina COVID-19",
            quantity: 70,
          },
          {
            name: "Dipirona 100mg",
            quantity: 50,
          },
          {
            name: "Ritalina 100mg",
            quantity: 70,
          },
        ],
      },
      {
        name: "Drogaria +Med",
        distance: 251,
        neighborhood: "Laranjal",
        location: {
          latitude: 1.0,
          longitude: 1.0,
        },
        medicines: [
          {
            name: "Vacina COVID-19",
            quantity: 25,
          },
          {
            name: "Dipirona 100mg",
            quantity: 150,
          },
          {
            name: "Ritalina 100mg",
            quantity: 30,
          },
        ],
      },
    ];

    const pharmsWithMedicine = pharms
      .map((pharm) => {
        const founded = !!pharm.medicines.find((medicine) =>
          medicine.name.toLowerCase().includes(medicineName.toLowerCase())
        );
        if (founded) return pharm;
      })
      .filter((one) => !!one);

    return response.status(200).json(pharmsWithMedicine);
  }
}

export default new PharmsController();
