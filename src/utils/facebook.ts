import axios from "axios"

interface Employer {
  id: String
  name: String
}

interface School {
  id: String
  name: String
}

interface Work {
  employer: [Employer]
}

interface Education {
  school: [School]
}

interface PictureData {
  url: String
}

interface Picture {
  data: PictureData
}

interface FacebookUser {
  id: string
  email: string | null
  name: string | null
  first_name: string
  last_name: string
  gender: string | null
  locale: string
  birthday: string | null
  education: Education | null
  work: Work | null
  picture: Picture
}

const ENDPOINT = "https://graph.facebook.com"
const API_VERSION = "v2.9"
const fields = `id,name,first_name,last_name,birthday,locale,education,work,email,gender,picture`

export const getFacebookUser = async (
  facebookToken: string,
): Promise<FacebookUser> => {
  const endpoint = `${ENDPOINT}/${API_VERSION}/me?fields=${fields}&access_token=${facebookToken}`

  try {
    const { data } = await axios.get(endpoint)
    return data
  } catch (error) {
    throw new Error(error)
  }
}
