package com.musicapp;

import android.content.ContentValues;
import android.content.Intent;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;
import android.provider.Settings;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;

public class RingtoneModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RingtoneModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "RingtoneModule";
    }

    // Check if WRITE_SETTINGS permission is granted
    private boolean canWriteSettings() {
        return Build.VERSION.SDK_INT < Build.VERSION_CODES.M || Settings.System.canWrite(reactContext);
    }

    // Request WRITE_SETTINGS permission by opening system settings
    private void requestWriteSettingsPermission() {
        Intent intent = new Intent(Settings.ACTION_MANAGE_WRITE_SETTINGS);
        intent.setData(Uri.parse("package:" + reactContext.getPackageName()));
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        reactContext.startActivity(intent);
    }

    @ReactMethod
    public void setRingtone(String filePath, Promise promise) {
        try {
            // Check WRITE_SETTINGS permission
            if (!canWriteSettings()) {
                promise.reject("ERROR", "WRITE_SETTINGS permission not granted");
                requestWriteSettingsPermission();
                return;
            }

            File file = new File(filePath);
            if (!file.exists()) {
                promise.reject("ERROR", "File does not exist");
                return;
            }

            ContentValues values = new ContentValues();
            values.put(MediaStore.MediaColumns.DISPLAY_NAME, file.getName());
            values.put(MediaStore.MediaColumns.MIME_TYPE, "audio/mp3");
            values.put(MediaStore.Audio.Media.IS_RINGTONE, true);
            values.put(MediaStore.Audio.Media.IS_NOTIFICATION, false);
            values.put(MediaStore.Audio.Media.IS_ALARM, false);
            values.put(MediaStore.Audio.Media.IS_MUSIC, false);

            Uri uri = reactContext.getContentResolver().insert(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, values);

            if (uri == null) {
                promise.reject("ERROR", "Failed to create MediaStore entry");
                return;
            }

            try (InputStream in = new FileInputStream(file);
                 OutputStream out = reactContext.getContentResolver().openOutputStream(uri)) {

                byte[] buffer = new byte[1024];
                int length;
                while ((length = in.read(buffer)) > 0) {
                    out.write(buffer, 0, length);
                }
            }

            RingtoneManager.setActualDefaultRingtoneUri(
                    reactContext,
                    RingtoneManager.TYPE_RINGTONE,
                    uri
            );

            promise.resolve("Ringtone set successfully");

        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }
}
