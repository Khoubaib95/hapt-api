export interface Session {
  _id: string;
  training: any; //TrainingDocument;
  instructor: any; // InstructorDocument;
  startDate: Date;
  endDate?: Date;
  students?: any; //ClientDocument[];
}
