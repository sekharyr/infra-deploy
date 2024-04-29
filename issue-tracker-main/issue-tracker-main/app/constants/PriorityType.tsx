const PriorityType = Object.freeze({
  LOW: { STATUS: "Low", COLOR: "yellow" },
  HIGH: {
    STATUS: "High",
    COLOR: "red",
  },
  MEDIUM: {
    STATUS: "Medium",
    COLOR: "orange",
  },
});

export default PriorityType;

//export type $DealershipType = $Values<typeof PriorityType>;
