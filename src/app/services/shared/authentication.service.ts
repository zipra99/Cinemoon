import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from './user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    userData: any;

    constructor(
        public afs: AngularFirestore,
        public ngFireAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone,
        public navCtrl: NavController
    ) {
        this.checkIsLogin(false);
    }

    createNewUser(userInfo: any, fullName: string) {
        const userDoc = this.afs.doc<any>(`users/${userInfo.uid}`);
        userDoc.set({
            uid: userInfo.uid,
            displayName: fullName,
            email: userInfo.email,
            emailVerified: userInfo.emailVerified,
            photoURL: 'https://picsum.photos/200'
        });
    }

    checkUserEmailVerify(fieldName: string, lookingValue: string) {
        this.getUserInfomation(fieldName, lookingValue).subscribe(data => {
            const userInfo = data[0];
            if (userInfo.emailVerified === false) {
                this.afs.doc<any>(`users/${userInfo.uid}`).update({
                    emailVerified: true
                });
            }
        });
    }

    checkIsLogin(isNavigate: boolean) {
        this.ngFireAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                if (isNavigate) {
                    this.navCtrl.navigateBack('home');
                }
            } else {
                localStorage.setItem('user', null);
            }
        });
    }

    getCurrentUserInfo(): Observable<any> {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            return this.afs.doc<any>(`users/${userData.uid}`).valueChanges();
        } else {
            return null;
        }
    }

    getUserInfomation(fieldName: string, lookingValue: string): Observable<User[]> {
        return this.afs.collection<any>('users', ref => ref.where(fieldName, '==', lookingValue)).valueChanges();
    }

    // Login in with email/password
    SignIn(email, password) {
        return this.ngFireAuth.signInWithEmailAndPassword(email, password);
    }

    // Register user with email/password
    RegisterUser(email, password) {
        return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
    }

    // Email verification when new user register
    SendVerificationMail() {
        return firebase.auth().currentUser.sendEmailVerification().then(() => {
            this.navCtrl.navigateBack(['verify-email']);
        });
    }

    // Recover password
    PasswordRecover(passwordResetEmail) {
        return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Password reset email has been sent, please check your inbox.');
            }).catch((error) => {
                window.alert(error);
            });
    }

    // Returns true when user is looged in
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null && user.emailVerified !== false) ? true : false;
    }

    // Returns true when user's email is verified
    get isEmailVerified(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user.emailVerified !== false) ? true : false;
    }

    // Sign in with Gmail
    GoogleAuth() {
        return this.AuthLogin(new auth.GoogleAuthProvider());
    }

    // Sign in with Facebook
    SignInWithFacebook() {
        return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
    }

    // Sign in with Github
    SignInWighGithub() {
        return this.AuthLogin(new firebase.auth.GithubAuthProvider());
    }

    // Sign in with Github
    SignInWighTwitter() {
        return this.AuthLogin(new firebase.auth.TwitterAuthProvider());
    }

    // Auth providers
    AuthLogin(provider) {
        return this.ngFireAuth.signInWithPopup(provider)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate(['home']);
                });
                this.SetUserData(result.user);
            }).catch((error) => {
                window.alert(error);
            });
    }

    // Store user in localStorage
    SetUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
        };
        return userRef.set(userData, {
            merge: true
        });
    }

    // Sign-out
    SignOut() {
        return this.ngFireAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.navCtrl.navigateBack(['home']);
        });
    }
}
