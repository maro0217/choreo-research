import { doc, DocumentData, FirestoreDataConverter, getDoc, getFirestore, QueryDocumentSnapshot, setDoc, SnapshotOptions } from "firebase/firestore"
import { db } from "src/firebase"
import { useRouter } from "next/router"

export type UserObj = {
    id: string
    name: string
    type: string | null
    style: Array<string>
    place: string | null
  }

// import {
//   DocumentData, FirestoreDataConverter, QueryDocumentSnapshot,
//   SnapshotOptions, serverTimestamp } from 'firebase/firestore'

/**
 * Firestore のドキュメントと Book オブジェクトの型変換を行います。
 */
 export const userConverter: FirestoreDataConverter<UserObj> = {
    /**
     * Book オブジェクトを Firestore ドキュメントデータへ変換します。
     */
    toFirestore(user: UserObj): DocumentData {
      // id は Firestore のパスで表現されるのでドキュメントデータには含めない。
      // 下記の updatedAt のように、自動で更新時刻のフィールドを追加することも可能。
      return {
        name: user.name,
        type: user.type,
        style: user.style,
        place: user.place
      }
    },
  
    /**
     * Firestore ドキュメントデータを Book オブジェクトへ変換します。
     */
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): UserObj {
      const data = snapshot.data(options)
      // Book オブジェクトの id プロパティには Firestore ドキュメントの id を入れる。
      return {
        id: snapshot.id,
        name: data.name,
        type: data.type,
        style: data.style,
        place: data.place
      }
    },
  } 
  
/** Firestore の books コレクションにドキュメントを追加する。 */
export async function addUser(user: UserObj) {
    const db = getFirestore()
    const docRef = doc(db, 'users', user.id).withConverter(userConverter)
    await setDoc(docRef, user)
  }
  

  export const useGetUser = async (url: string) => {
      const router = useRouter()
      const id = router.query.id
      if (typeof id === 'string') {
        const docRef = doc(db, url, id);
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          return docSnap.data()
        }
  }
}


