import "@/lib/node-polyfill";
import { GoogleAuth } from "google-auth-library";
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const auth = new GoogleAuth({
    scopes: "https://www.googleapis.com/auth/spreadsheets",
    projectId: "beersheba-school",
    credentials: {
      client_email:
        "beersheba-school-data@beersheba-school.iam.gserviceaccount.com",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDYOIS9l5smDLeN\nIFubNLtZWBEaUNQRvu+yShynQ3ZaY4lvW1ouCmb1detnOEEdMG+9hOBlWuFUO8GJ\n07JQNF5l8up2KXI3U8e20t/kUdiRFWKNDQ2fasyvGGVne+3R0ivHdI8RY00l3nr8\nYp5fIy2ZObI5a36B3m+AOuBce/6zrD67uUeOPj1QiOUqPdn5D59FIzoSOIEcAl/L\nR1sOyuus2CcU2NIoTinI3kOziqjhW5Lw+wxOHDVS5+fyfCrmEt0V5UisF0F9EiwQ\nhmd/UX0fb7+6+AGbDQH0lj/kLPFGxfNS2EmN9vfjzPgINo2ms2GjKXDIju3zlXBO\noVlLkhb7AgMBAAECggEAY/9jmKF0fhj0jN7RrwqouM3Lfx2xrpFdHto6vTqskmol\nZixcHR3vdwc1uzOfnaXIj+BTvVxWCNRoElunRIOrwr+hIsvRSHhFTa7iICCgJZ07\nylsmmTtV9Ya1YzJEDz2BxMmJ3zNLOz/VJkNf1kUZMhumavrlc5+Rdr8EA5HO/n3J\nleYANWCn4ZZ/9SCUdvFIS8OsTG3OnvK8m1H/Dn8mnhfDgLIINXM3kEo0PIlgjDYu\nTBlQZbt0XN7GIh4J++93bNgOjCWozk+yZ6Hu6Q4/zga77rq2MKhVJTfKaHhfYkBr\nI2Q+D1KNzVCvKm8XGHyeobnOwBDqcE+CZPDHZfOiXQKBgQDtykpjQnIRMhkOwcx5\nETq1sL3hoVXkDTQh4akopcy1tfSK7BZtSdxw1lhhxv8QwLBThQK76KspV6HAVLXz\nocIzksGTjWZauV7YQlciIcU23y5iMqoSFKqLusmZzSONrTdMizzallnf1vLK/5zw\nycuHKB+QzKhUAFqKqOOl18MjlwKBgQDox1/mHPBvFApk49iBfacH2bbN5apoai2D\ntQ1bvMgg+2RVXRD8l6Lbq2uupBFIvsrf2++gjfNnk+qx8MpdyB9kd1lHRn8G61wO\nIlkgL3OUM+2DCb/ns11ZbH+NA+dW5mGb3VcZlHIl8OqkVcq6JS2PFBjKhwmtqnVE\nWc/+GiXEPQKBgEdcsj5froPimQqItqiOtyPXyuRv2qr6G28fnfiI6YqO9LjMaV6b\nEAD9EsElS17ntQMbo9po1RUvK2fhBEn9fZ6kqFtz0AfiIcidADFKGTmCeRUXR1rt\nwND2WZJCsizOkw3xq22eOZKnm224kIziwqXpMK/v+4RaJtH+JXOb8QA5AoGACANU\n+cblP+2grfhp64s3xL1p3YyaYR3Gk1IYM6A8A2aj/YxGmWte39D20/wx3B81PJ+F\nkDFSv64H1jhDvxa0ffDd0eZLWSGg+ZuVFdaMU/21n10mjgNOo1VozqHjxMoJciQc\na3UAuO2iJiYN5HqDJvm6IL6lRqUnhELTNhwQUMECgYEAhAlNJEarOBob/1eIwyuJ\nzVGEX7Dqlb8zvVKOnYx0cmT4hBA3Lbljt3keo/Mygj5JVjnH3dexfTOn+FIxsgjj\nhO26j/LNhS+Pk9viQhhXpO5Qsqvj10Dyx8KW30SB86St27EGQwPVxqaTc04fnR+I\nI35Cf59ohm/MbS3lE7tcU1Q=\n-----END PRIVATE KEY-----\n",
    },
  });

  const spreadsheetId = "1NEH21-aN9MNdsZThjAho9J-khDqFnA9zSfPtr_PGKGM";

  const service = google.sheets({ version: "v4", auth });

  let range = ["Haldwani!A:M"];

  try {
    const body = await req.json();
    const {
      classes,
      name,
      fatherName,
      motherName,
      gender,
      email,
      phoneNumber,
      category,
      lastSchoolName,
      fatherOccupation,
      motherOccupation,
      annualIncome,
      referedBy,
    } = body;

    let values = [
      [
        classes,
        name,
        fatherName,
        motherName,
        gender,
        email,
        phoneNumber,
        category,
        lastSchoolName,
        fatherOccupation,
        motherOccupation,
        annualIncome,
        referedBy,
      ],
    ];

    const resource = {
      values,
    };
    //@ts-ignore
    const result = await service.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      resource,
    });

    return NextResponse.json({ result });
  } catch (err) {
    console.error("Registration API Error:", err);
    return NextResponse.json(
      { error: "Failed to submit registration form" },
      { status: 500 }
    );
  }
}
