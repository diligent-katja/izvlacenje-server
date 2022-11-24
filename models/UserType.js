export const UserTypeOfSchema = {
  user_id: {
    type: String,
    unique: true,
    required: true
  },
  game_id: {
    type: String
  },
  name: {
    type: String,
    required: true,
  },
  cantBuy: {
    type: String,
  },
  isBuying: {
    type: String,
  },
  selectedBy: {
    type: String,
  },
  isCreator: {
    type: Boolean,
    default: false
  }
}
