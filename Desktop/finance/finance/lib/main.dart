import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'firebase_options.dart';
import 'controllers/auth_controller.dart';
import 'controllers/finance_controller.dart';
import 'theme/app_theme.dart';
import 'screens/main_scaffold.dart';
import 'screens/auth/login_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: ".env");
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  await GoogleSignIn.instance.initialize();
  
  Get.put(AuthController());
  Get.put(FinanceController());
  
  runApp(const FinanceApp());
}

class FinanceApp extends StatelessWidget {
  const FinanceApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetBuilder<FinanceController>(
      builder: (controller) {
        return GetMaterialApp(
          title: 'Finance Companion',
          debugShowCheckedModeBanner: false,
          theme: AppTheme.lightTheme,
          darkTheme: AppTheme.darkTheme,
          themeMode: controller.isDarkMode ? ThemeMode.dark : ThemeMode.light,
          home: const RootWrapper(),
        );
      },
    );
  }
}

class RootWrapper extends StatelessWidget {
  const RootWrapper({super.key});

  @override
  Widget build(BuildContext context) {
    return Obx(() {
      final user = AuthController.to.firebaseUser.value;
      if (user != null) {
        return const MainScaffold();
      } else {
        return const LoginScreen();
      }
    });
  }
}

