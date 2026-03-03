export type Unit = "C" | "F";

export type Election = {
  id: string;
  public_id: string;
  name: string;
  unit: Unit;
  temperature: number;
};

export type Vote = {
  id: string;
  election_id: string;
  ideal_temp: number;
  comfort_range: [number, number];
  current_temp: number;
};
