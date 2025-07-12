export class CreateCustomerDto {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  birth_date: Date;
  gender: string;
  password: string;
  confirm_password: string;
  activation_link: string;
}
