import _ from "lodash";

const pharms = [
  {
    name: "UBS - Unidade Básica de Saúde José Gaspar Abreu Magalhães",
    distance: 500,
    neighborhood: "Rústico",
    location: {
      latitude: -22.5210401,
      longitude: -44.1124399,
    },
    medicines: [
      {
        name: "Dipirona 100mg",
        quantity: 50,
        needToSchedule: false,
      },
      {
        name: "Vacina COVID-19",
        quantity: 2,
        needToSchedule: true,
      },
    ],
  },
  {
    name: "UBSF - Unidade Básica de Saúde da Família",
    distance: 1100,
    neighborhood: "Eucaliptal",
    location: {
      latitude: -22.5246271,
      longitude: -44.1212279,
    },
    medicines: [
      {
        name: "Paracetamol 100mg",
        quantity: 152,
        needToSchedule: false,
      },
      {
        name: "Vacina COVID-19",
        quantity: 200,
        needToSchedule: true,
      },
      {
        name: "Dipirona 100mg",
        quantity: 75,
        needToSchedule: false,
      },
      {
        name: "Ritalina 100mg",
        quantity: 20,
        needToSchedule: true,
      },
    ],
  },
  {
    name: "UBSF - Unidade Básica de Saúde Família Sebastião Rodrigues Ferreira",
    distance: 251,
    neighborhood: "Açude",
    location: {
      latitude: -22.5254075,
      longitude: -44.1275994,
    },
    medicines: [
      {
        name: "Paracetamol 100mg",
        quantity: 63,
        needToSchedule: false,
      },
      {
        name: "Vacina COVID-19",
        quantity: 70,
        needToSchedule: true,
      },
      {
        name: "Dipirona 100mg",
        quantity: 50,
        needToSchedule: false,
      },
      {
        name: "Ritalina 100mg",
        quantity: 70,
        needToSchedule: false,
      },
    ],
  },
  {
    name: "Serviço de Pronto Atendimento do Conforto - CAIS Conforto",
    distance: 251,
    neighborhood: "Conforto",
    location: {
      latitude: -22.5222275,
      longitude: -44.1225341,
    },
    medicines: [
      {
        name: "Vacina COVID-19",
        quantity: 25,
        needToSchedule: true,
      },
      {
        name: "Dipirona 100mg",
        quantity: 150,
        needToSchedule: false,
      },
      {
        name: "Ritalina 100mg",
        quantity: 30,
        needToSchedule: false,
      },
    ],
  },
];

class PharmsController {
  index(request, response) {
    return response.status(200).json(pharms);
  }

  indexByMedicine(request, response) {
    const { medicineName } = request.params;

    const pharmsWithMedicine = pharms
      .map((pharm) => {
        const founded = !!pharm.medicines.find((medicine) =>
          medicine.name.toLowerCase().includes(medicineName.toLowerCase())
        );

        if (founded) {
          const quantity = pharm.medicines.find((medicine) =>
            medicine.name.toLowerCase().includes(medicineName.toLowerCase())
          ).quantity;

          return {
            ...pharm,
            quantity,
          };
        }
      })
      .filter((one) => !!one);

    return response
      .status(200)
      .json(_.sortBy(pharmsWithMedicine, ["distance"]));
  }
}

export default new PharmsController();
