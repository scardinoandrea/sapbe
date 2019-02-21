export class Student {
    _key: string
    name: string
    percentage: number
    period: string
    personalId: number
    status: string
    tutor_key: string
    tutor_name: string
    type: string
    notes: [Note]
    results: [Result]
}

export class Note {
    _key: String
    date: string
    type: string
    content: string
}

export class Result{
    _key: String
    date: string
    characteristics: string
    percentage: number
}

export class Tutor {
    _key: String
    email: string
    username: string
    role: string
}