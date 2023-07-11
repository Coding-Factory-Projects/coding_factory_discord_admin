export class CreateStudentDto {
  firstName: string;
  lastName: string;
  email: string;
}

export class CreatePromotionDto {
  name: string;
  discord_role_id: string;
  // students: CreateStudentDto[];
}
