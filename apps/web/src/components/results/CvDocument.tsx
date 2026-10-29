
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import type { TailoredCv } from "../../types/analysis";
import { styles } from "./CvStyles";
import { parseDateForSort } from "./cvUtils";

interface CvDocumentProps {
  cv: TailoredCv;
  photoData?: string | null;
  themeColor?: string;
}

export default function CvDocument({
  cv,
  photoData,
  themeColor = "#5a85b5",
}: CvDocumentProps) {
  const sortedExperience = [...cv.experience].sort(
    (a, b) => parseDateForSort(b.period) - parseDateForSort(a.period),
  );

  const sortedProjects = cv.projects
    ? [...cv.projects].sort((a, b) => {
        return parseDateForSort(b.period) - parseDateForSort(a.period);
      })
    : [];

  return (
    <Document title={`${cv.fullName} CV`}>
      <Page size="A4" style={styles.page}>
        <View style={[styles.leftColumn, { backgroundColor: themeColor }]}>
          {photoData && (
            <View style={styles.photoContainer}>
              <Image src={photoData} style={styles.photo} alt="Profile photo" />
            </View>
          )}

          <Text style={styles.sectionTitleLeft}>Tech Skills</Text>
          <Text style={styles.skillText}>{cv.skills.join(" • ")}</Text>

          {cv.softSkills && cv.softSkills.length > 0 && (
            <>
              <Text style={styles.sectionTitleLeft}>Soft Skills</Text>
              <Text style={styles.skillText}>{cv.softSkills.join(" • ")}</Text>
            </>
          )}

          {cv.certificates && cv.certificates.length > 0 && (
            <>
              <Text style={styles.sectionTitleLeft}>Certificates</Text>
              {cv.certificates.map((cert, i) => (
                <View key={i} style={{ marginBottom: 4 }}>
                  <Text style={styles.skillText}>{cert.title}</Text>
                </View>
              ))}
            </>
          )}

          {cv.languages && cv.languages.length > 0 && (
            <>
              <Text style={styles.sectionTitleLeft}>Languages</Text>
              <Text style={styles.skillText}>{cv.languages.join(" • ")}</Text>
            </>
          )}

          <Text style={styles.sectionTitleLeft}>Education</Text>
          {cv.education.map((ed, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <Text style={styles.bold}>{ed.title}</Text>
              <Text style={styles.skillText}>{ed.details}</Text>
            </View>
          ))}
        </View>

        <View style={styles.rightColumn}>
          <Text style={styles.name}>{cv.fullName}</Text>

          <Text style={[styles.headline, { color: themeColor }]}>
            {cv.headline}
          </Text>

          {cv.contacts && cv.contacts.length > 0 && (
            <View style={styles.contactsRow}>
              {cv.contacts.map((contact, i) => (
                <Text key={i}>
                  {contact}
                  {i < cv.contacts.length - 1 ? "  |  " : ""}
                </Text>
              ))}
            </View>
          )}

          <Text
            style={[
              styles.sectionTitleRight,
              { color: themeColor, borderBottomColor: themeColor },
            ]}
          >
            Summary
          </Text>
          <Text style={styles.paragraph}>{cv.summary}</Text>

          {sortedProjects && sortedProjects.length > 0 && (
            <>
              <Text
                style={[
                  styles.sectionTitleRight,
                  { color: themeColor, borderBottomColor: themeColor },
                ]}
              >
                Projects
              </Text>
              {sortedProjects.map((p, i) => (
                <View key={i} style={styles.itemBlock} wrap={false}>
                  <View style={styles.roleRow}>
                    <Text style={styles.bold}>
                      {p.title} {p.link ? `(${p.link})` : ""}
                    </Text>
                    {(p.date || p.period) && (
                      <Text style={{ fontSize: 8, color: "#666" }}>
                        {p.date || p.period}
                      </Text>
                    )}
                  </View>
                  {p.techStack && (
                    <Text style={styles.projectTech}>
                      Tech stack: {p.techStack}
                    </Text>
                  )}
                  <Text style={styles.paragraph}>{p.description}</Text>
                </View>
              ))}
            </>
          )}

          <Text
            style={[
              styles.sectionTitleRight,
              { color: themeColor, borderBottomColor: themeColor },
            ]}
          >
            Work Experience
          </Text>
          {sortedExperience.map((e, i) => (
            <View key={i} style={styles.itemBlock} wrap={false}>
              <View style={styles.roleRow}>
                <Text style={styles.bold}>
                  {e.company} — {e.role}
                </Text>
                <Text>{e.period}</Text>
              </View>
              {e.bullets.map((b, j) => (
                <View key={j} style={styles.bulletRow}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{b}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}