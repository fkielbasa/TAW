import  UserModel  from '../schemas/user.schema';
import {IUser} from "../models/user.model";
import {EmailService} from "./email.service";


class UserService {
    private emailService: EmailService;

    constructor() {
        this.emailService = new EmailService();
    }
   public async createNewOrUpdate(user: IUser) {
       console.log(user)
       try {
           if (!user._id) {
               const dataModel = new UserModel(user);
               return await dataModel.save();
           } else {
               return await UserModel.findByIdAndUpdate(user._id, { $set: user }, { new: true });
           }
       } catch (error) {
           console.error('Wystąpił błąd podczas tworzenia danych:', error);
           throw new Error('Wystąpił błąd podczas tworzenia danych');
       }
   }

   public async getByEmailOrName(name: string) {
    console.log(name)
       try {
           const result = await UserModel.findOne({ $or: [{ email: name }, { name: name }] });
           if (result) {
               return result;
           }
       } catch (error) {
           console.error('Wystąpił błąd podczas pobierania danych:', error);
           throw new Error('Wystąpił błąd podczas pobierania danych');
       }
   }
   public async changePassword(id: string) {
    try {
        const user = await UserModel.findOne({ _id: id });
        const newPassword = generateRandomPassword(8);
        if (user) {
            await UserModel.findByIdAndUpdate(id, { $set: { password: newPassword } });
        
            await this.emailService.sendPasswordChangeEmail(user.email, newPassword);
        } else {
            throw new Error('Użytkownik o podanym id nie istnieje');
        }
    } catch (error) {
        throw new Error('Wystąpił błąd podczas zmiany hasła');
    }
}
}

export default UserService;