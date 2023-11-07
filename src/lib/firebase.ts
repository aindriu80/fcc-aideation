// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app' // TODO: Add SDKs for Firebase products that you want to use
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage' // TODO: Add SDKs for Firebase products

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'fcc-aideation.firebaseapp.com',
  projectId: 'fcc-aideation',
  storageBucket: 'fcc-aideation.appspot.com',
  messagingSenderId: '471472055237',
  appId: '1:471472055237:web:853f7f7cade2370dba21ac',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)

export async function uploadFileToFirebase(image_url: string, name: string) {
  try {
    const response = await fetch(image_url)
    const buffer = await response.arrayBuffer()
    const file_name = name.replace(' ', '') + Date.now + '.jpeg'
    const storageRef = ref(storage, file_name)
    await uploadBytes(storageRef, buffer, {
      contentType: 'image/jpeg',
    })
    const firebase_url = await getDownloadURL(storageRef)
    return firebase_url
  } catch (error) {
    console.error(error)
  }
}
