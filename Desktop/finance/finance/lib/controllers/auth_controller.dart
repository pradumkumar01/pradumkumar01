import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_sign_in/google_sign_in.dart';
import '../data/mock_data.dart';

class AuthController extends GetxController {
  static AuthController get to => Get.find();

  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _db = FirebaseFirestore.instance;
  final GoogleSignIn _googleSignIn = GoogleSignIn.instance;

  final Rxn<User> firebaseUser = Rxn<User>();
  final RxBool isLoading = false.obs;

  @override
  void onInit() {
    super.onInit();
    // Bind the auth state stream to firebaseUser Rx variable
    firebaseUser.bindStream(_auth.authStateChanges());
  }

  // Sign up with Email, Password and Name
  Future<bool> signUp(String name, String email, String password) async {
    try {
      isLoading.value = true;

      // Create user in Firebase Auth
      UserCredential userCredential = await _auth
          .createUserWithEmailAndPassword(
            email: email.trim(),
            password: password.trim(),
          );

      User? user = userCredential.user;
      if (user != null) {
        // Update user display name in Firebase Auth
        await user.updateDisplayName(name.trim());
        await user.reload();

        // Save additional user info in Firestore
        await _db.collection('users').doc(user.uid).set({
          'uid': user.uid,
          'name': name.trim(),
          'email': email.trim(),
          'createdAt': FieldValue.serverTimestamp(),
        });

        // Seed initial transactions in a batch
        final batch = _db.batch();
        for (var t in mockTransactions) {
          final docRef = _db
              .collection('users')
              .doc(user.uid)
              .collection('transactions')
              .doc();
          batch.set(docRef, t.toJson());
        }

        // Seed initial goals in a batch
        for (var g in mockGoals) {
          final docRef = _db
              .collection('users')
              .doc(user.uid)
              .collection('goals')
              .doc();
          batch.set(docRef, g.toJson());
        }

        await batch.commit();
      }

      Get.snackbar(
        'Success',
        'Account created successfully!',
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: Colors.green.withOpacity(0.1),
        colorText: Colors.green[800],
      );
      return true;
    } on FirebaseAuthException catch (e) {
      String errorMessage = 'An error occurred. Please try again.';
      if (e.code == 'weak-password') {
        errorMessage = 'The password provided is too weak.';
      } else if (e.code == 'email-already-in-use') {
        errorMessage = 'An account already exists for that email.';
      } else if (e.code == 'invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      }

      Get.snackbar(
        'Error',
        errorMessage,
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: Colors.red.withOpacity(0.1),
        colorText: Colors.red[800],
      );
      return false;
    } catch (e) {
      Get.snackbar(
        'Error',
        e.toString(),
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: Colors.red.withOpacity(0.1),
        colorText: Colors.red[800],
      );
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  // Login with Email and Password
  Future<bool> login(String email, String password) async {
    try {
      isLoading.value = true;
      await _auth.signInWithEmailAndPassword(
        email: email.trim(),
        password: password.trim(),
      );

      Get.snackbar(
        'Success',
        'Logged in successfully!',
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: Colors.green.withOpacity(0.1),
        colorText: Colors.green[800],
      );
      return true;
    } on FirebaseAuthException catch (e) {
      String errorMessage = 'Invalid email or password.';
      if (e.code == 'user-not-found') {
        errorMessage = 'No user found with this email.';
      } else if (e.code == 'wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (e.code == 'invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      }

      Get.snackbar(
        'Login Failed',
        errorMessage,
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: Colors.red.withOpacity(0.1),
        colorText: Colors.red[800],
      );
      return false;
    } catch (e) {
      Get.snackbar(
        'Error',
        e.toString(),
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: Colors.red.withOpacity(0.1),
        colorText: Colors.red[800],
      );
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  // Logout
  Future<void> logout() async {
    try {
      await _auth.signOut();
      await _googleSignIn.signOut();
      Get.snackbar(
        'Logged Out',
        'You have been logged out successfully.',
        snackPosition: SnackPosition.BOTTOM,
      );
    } catch (e) {
      Get.snackbar(
        'Error Logging Out',
        e.toString(),
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: Colors.red.withOpacity(0.1),
        colorText: Colors.red[800],
      );
    }
  }

  // Sign in with Google
  Future<bool> signInWithGoogle() async {
    try {
      isLoading.value = true;

      // Trigger Google Auth Flow
      final GoogleSignInAccount? googleUser = await _googleSignIn
          .authenticate();
      if (googleUser == null) {
        return false; // User cancelled
      }

      final GoogleSignInAuthentication googleAuth =
          await googleUser.authentication;

      final AuthCredential credential = GoogleAuthProvider.credential(
        idToken: googleAuth.idToken,
      );

      final UserCredential userCredential = await _auth.signInWithCredential(
        credential,
      );
      final User? user = userCredential.user;

      if (user != null) {
        // Save user profile info if it's their first time
        final userDoc = await _db.collection('users').doc(user.uid).get();
        if (!userDoc.exists || userDoc.data()?['seeded'] != true) {
          final batch = _db.batch();

          batch.set(_db.collection('users').doc(user.uid), {
            'uid': user.uid,
            'name': user.displayName ?? 'Google User',
            'email': user.email ?? '',
            'seeded': true,
            'createdAt': FieldValue.serverTimestamp(),
          }, SetOptions(merge: true));

          // Seed default mock data
          for (var t in mockTransactions) {
            final docRef = _db
                .collection('users')
                .doc(user.uid)
                .collection('transactions')
                .doc();
            batch.set(docRef, t.toJson());
          }

          for (var g in mockGoals) {
            final docRef = _db
                .collection('users')
                .doc(user.uid)
                .collection('goals')
                .doc();
            batch.set(docRef, g.toJson());
          }

          await batch.commit();
        }
      }

      Get.snackbar(
        'Success',
        'Logged in with Google successfully!',
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: Colors.green.withOpacity(0.1),
        colorText: Colors.green[800],
      );
      return true;
    } catch (e) {
      Get.snackbar(
        'Google Sign In Failed',
        e.toString(),
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: Colors.red.withOpacity(0.1),
        colorText: Colors.red[800],
      );
      return false;
    } finally {
      isLoading.value = false;
    }
  }
}
