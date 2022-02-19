import { db } from 'src/lib/db'
import { UserInputError } from '@redwoodjs/graphql-server'

export const contacts = () => {
  return db.contact.findMany()
}

export const createContact = ({ input }) => {

  const validate = (input) => {
    if (input.email && !input.email.match(/[^@]+@[^.]+\..+/)) {
      throw new UserInputError("Can't create new contact", {
        messages: {
          email: ['is not formatted like an email address'],
        },
      })
    }
  }

  validate(input)
  return db.contact.create({ data: input })
}