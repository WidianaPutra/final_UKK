type DestinationType = Array<{
  id: string;
  label: string;
  destinations: Array<string>;
}>;

type InformationType<T extends string> = {
  id: T;
  label: string;
  items: Array<string>;
};

type DataType = {
  id: string;
  label: string;
  images: Array<string>;
  menus: [
    { id: "General"; label: string; description: string },
    { id: "Destinations"; label: string; destinations: DestinationType },
    {
      id: "infomation";
      label: string;
      required?: InformationType<"required">;
      included?: InformationType<"included">;
    },
  ];
};

const Datas: Array<DataType> = [
  {
    id: "package-1",
    label: "Keliling cihuy",
    images: ["image-1", "image-2", "image-3"],
    menus: [
      // General
      {
        id: "General",
        label: "",
        description: "Ini ni tu kesana",
      },
      // Destination
      {
        id: "Destinations",
        label: "",
        destinations: [
          {
            id: "day-1",
            label: "dia-1",
            destinations: ["Sangeh", "Kintamani"],
          },
          {
            id: "day-2",
            label: "dia-1",
            destinations: ["Moon", "Mars"],
          },
        ],
      },
      // information
      {
        id: "infomation",
        label: "",
        required: {
          id: "required",
          label: "",
          items: [""],
        },
        included: {
          id: "included",
          label: "",
          items: [""],
        },
      },
    ],
  },
];
