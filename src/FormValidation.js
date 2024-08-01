import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object({
    name: Yup.string()
    .matches(/^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/, 'Please enter a name containing only alphabetic characters.')
    .trim()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),  
    email: Yup.string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid gmail address (e.g., example@gmail.com).')
        .email('Invalid email format')
        .required('Email is required'),
    mobile: Yup.string()     
        .matches(/^\d{10}$/, "Mobile number must be 10 digits")
        .required('Mobile number is required'),
    password: Yup.string()
        .trim()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
});

export const signInValidationSchema = Yup.object({
    email: Yup.string()
        .matches(/^[a-zA-Z0-9._-]+@gmail\.com$/, 'Please enter a valid gmail address (e.g., example@gmail.com).')
        .email('Invalid email format')
        .required('Please enter the email'),
    password: Yup.string()
        .trim()
        .required('Please enter the password')
});


export const addBikeValidationSchema = Yup.object({
    bikeName: Yup.string()
        .trim()
        .required('Please enter a bike name'),
    bikeNO: Yup.string()
        .trim()
        .required('Please enter a bike number'),
    bikeType: Yup.string()
        .trim()
        .required('Please select a bike type'),
    bikeCC: Yup.string()
        .required('Please enter a bike cc'),
    location: Yup.string()
        .trim()
        .required('Please select bike location'),
    rent: Yup.string()
        .trim()
        .required('Please enter a rent amount'),
    details: Yup.string()
        .trim()
        .required('Please enter bike details'),
    image: Yup.array()
        .min(3, 'Please select at least three image')
        .required('Please select bike image'),
    address : Yup.string()
    .trim()
    .required('Please enter the address'),
    pinCode: Yup.string()
    .required('Please enter a Pincode')
    .min(6,'Invalid pincode'),
    document: Yup.array()
    .max(2, 'Please select at least three image')
    .required('Please select Rc & Insure'),
});



export const passwordValidationSchema = Yup.object({
    password: Yup.string()
      .trim()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    conformPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password')
})

export const dateValidationSchema = Yup.object({
    pickupDate : Yup.date()
    .required('Pickup date & time required')
    .min(new Date(),'Pickup date must be today or in the future'),
    dropoffDate: Yup.date()
    .required('Dropoff date & time required')
    .min(new Date(), 'Dropoff date must be in the future'),
    pickupTime : Yup.string()
    .required('Pickup date & time required'),
    dropoffTime : Yup.string()
    .required('Dropoff date & time required')
})

