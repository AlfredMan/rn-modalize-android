import { User } from "firebase/auth";
import ShortUniqueId from "short-unique-id";
import { getDoc, getFirestore, setDoc } from "@firebase/firestore";
import { doc } from "firebase/firestore";
import { Join1Model, Join2Model } from "../../screens/UserScreens/model";
import { auth } from "../../firebase/firebaseClient";
export const createDefaultUserDocWithAuthId = async ({
  user,
  //   name = "",
  //   dateOfBirth = null,

  joinData,
}: {
  user: User;
  //   name?: string;
  //   dateOfBirth?: Date | null;
  joinData: Join1Model & Join2Model;
}) => {
  if (!joinData) {
    console.log("No join data provided for createDefaultUserDocWithAuthId");
    return;
  }
  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    postcode,
    password,
    confirmPassword,
    upToDateWithEat,
    upToDateWithPlay,
    upToDateWithShop,
    optInToNewsLetter,
  } = joinData;
  const firestore = getFirestore();
  const shortUid = new ShortUniqueId();
  const referralCode = shortUid();
  await setDoc(doc(firestore, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    // name: name || user.displayName,

    firstName,
    lastName,
    dateOfBirth: new Date(dateOfBirth),
    postcode,
    upToDateWithEat,
    upToDateWithPlay,
    upToDateWithShop,
    optInToNewsLetter,

    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    points: 400,
    tier: 0,
    usedReferralCode: false,
    referralCode: referralCode,
    avatarConfig: "",
    examAttempt: 0,
    highestExamScore: 0,
    lastExamDate: null,
    // dateOfBirth,
    // subscribeBaoNewsLetter: false,
    // orderDict: {},
  });
};

