export class CreateStudentDto {
  firstName: string;
  lastName: string;
}

export class CreatePromotionDto {
  name: string;
  students: CreateStudentDto[];
}
