import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';

const BOOKS_KEY = '@bookworm/books';
const logo = require('./assets/bookworm-logo.png');
const sanctuary = require('./assets/reading-sanctuary.png');

export default function App() {
  const [screen, setScreen] = useState('library');
  const [books, setBooks] = useState([]);
  const { height } = useWindowDimensions();

  useEffect(() => {
    AsyncStorage.getItem(BOOKS_KEY).then((value) => {
      if (value) setBooks(JSON.parse(value));
    });
  }, []);

  const importPdf = () => Alert.alert('Add PDF', 'PDF importing will be added in the next development step.');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        {screen === 'library' ? (books.length ? <LibraryScreen books={books} onImport={importPdf} onRead={() => setScreen('details')} onSearch={() => setScreen('search')} /> : <WelcomeScreen onImport={importPdf} onSearch={() => setScreen('search')} />) : screen === 'search' ? <SearchScreen onBack={() => setScreen('library')} /> : screen === 'details' ? <BookDetailsScreen onBack={() => setScreen('library')} onRead={() => setScreen('reading')} /> : screen === 'reading' ? <ReadingScreen onBack={() => setScreen('library')} onBionic={() => setScreen('bionic')} /> : screen === 'bionic' ? <BionicScreen onBack={() => setScreen('reading')} /> : <SettingsScreen />}
      </View>
      {screen !== 'reading' && <View style={[styles.navigation, height < 760 && styles.navigationCompact]}>
          <NavItem icon="▣" label="Library" active={screen === 'library'} onPress={() => setScreen('library')} />
          <NavItem icon="⚙" label="Settings" active={screen === 'settings'} onPress={() => setScreen('settings')} />
        </View>}
    </SafeAreaView>
  );
}

function WelcomeScreen({ onImport, onSearch }) {
  const { width, height } = useWindowDimensions();
  const compact = height < 1000 || width < 390;
  const narrow = width < 370;
  const illustrationWidth = Math.min(width - (narrow ? 68 : 112), compact ? 330 : 435);

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Pressable accessibilityLabel="Library menu" style={styles.topIcon}><Text style={styles.bookIcon}>▤</Text></Pressable>
        <Text style={styles.brand}>BookWorm</Text>
        <Pressable accessibilityLabel="Search" onPress={onSearch} style={styles.topIcon}><Text style={styles.searchIcon}>⌕</Text></Pressable>
      </View>
      <View style={[styles.hero, compact && styles.heroCompact]}>
        <Image source={logo} style={[styles.logo, compact && styles.logoCompact, narrow && styles.logoNarrow]} resizeMode="contain" />
        <Text style={[styles.heading, compact && styles.headingCompact, narrow && styles.headingNarrow]}>Your Digital{`\n`}Sanctuary.</Text>
        <Text style={[styles.subtitle, compact && styles.subtitleCompact, narrow && styles.subtitleNarrow]}>Read better. Read more. A place for focused{`\n`}reading.</Text>
        <Image source={sanctuary} style={[styles.illustration, compact && styles.illustrationCompact, narrow && styles.illustrationNarrow, { width: illustrationWidth, height: illustrationWidth * 0.552 }]} resizeMode="contain" />
        <View style={styles.actionArea}>
          <Pressable accessibilityRole="button" style={({ pressed }) => [styles.primaryButton, compact && styles.primaryButtonCompact, narrow && styles.primaryButtonNarrow, pressed && styles.pressed]} onPress={onImport}>
            <Text style={styles.plus}>+</Text><Text style={styles.primaryButtonText}>Add PDF</Text>
          </Pressable>
          <Text style={styles.supports}>Supports PDF, EPUB</Text>
        </View>
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel="Add PDF" style={[styles.fab, compact && styles.fabCompact, narrow && styles.fabNarrow]} onPress={onImport}><Text style={styles.fabText}>+</Text></Pressable>
    </View>
  );
}

function LibraryScreen({ books, onImport, onRead, onSearch }) {
  return (
    <View style={styles.libraryScreen}>
      <View style={styles.topBar}>
        <View style={styles.topBrand}><Text style={styles.bookIcon}>▤</Text><Text style={styles.libraryBrand}>BookWorm</Text></View>
        <Pressable accessibilityLabel="Search" onPress={onSearch} style={styles.topIcon}><Text style={styles.searchIcon}>⌕</Text></Pressable>
      </View>
      <Text style={styles.sectionTitle}>Continue Reading</Text>
      {books.length > 0 ? <ContinueCard book={books[0]} onRead={onRead} /> : <View style={styles.emptyCard}><Text style={styles.emptyTitle}>Your shelf is waiting</Text><Text style={styles.emptyBody}>Add a PDF to begin your focused reading journey.</Text></View>}
      <View style={styles.allBooksHeader}><Text style={styles.sectionTitle}>All Books</Text><Text style={styles.viewAll}>View All</Text></View>
      {books.length > 0 ? <View style={styles.bookGrid}>{books.map((book, index) => <BookCard key={book.id || index} book={book} />)}</View> : <Text style={styles.emptyBooks}>No books yet</Text>}
      <Pressable accessibilityRole="button" accessibilityLabel="Add PDF" style={styles.libraryFab} onPress={onImport}><Text style={styles.libraryFabText}>+</Text></Pressable>
    </View>
  );
}

function ContinueCard({ book, onRead }) {
  return <View style={styles.continueCard}><View style={styles.coverPlaceholder}><Text style={styles.coverMark}>BOOK</Text></View><View style={styles.continueInfo}><Text style={styles.progressChip}>▣  42% Read</Text><Text style={styles.bookTitle}>{book.title || 'Untitled book'}</Text><Text style={styles.author}>by {book.author || 'Unknown author'}</Text><View style={styles.progressRow}><Text style={styles.meta}>Continue reading</Text><Text style={styles.meta}>12 hrs left</Text></View><View style={styles.progressTrack}><View style={styles.progressFill} /></View><Pressable style={styles.continueButton} onPress={onRead}><Text style={styles.continueButtonText}>Continue  ›</Text></Pressable></View></View>;
}

function BookDetailsScreen({ onBack, onRead }) {
  const [mode, setMode] = useState('Comfort');
  return <ScrollView style={styles.details} contentContainerStyle={styles.detailsContent}>
    <Pressable accessibilityLabel="Go back" onPress={onBack} style={styles.detailsBack}><Text style={styles.detailsBackText}>‹</Text></Pressable>
    <View style={styles.detailsCover}><Image source={logo} style={styles.detailsCoverImage} resizeMode="cover" /></View>
    <Text style={styles.detailsTitle}>The Architecture of Calm</Text><Text style={styles.detailsAuthor}>By Elara Vance</Text>
    <View style={styles.detailsMeta}><Text style={styles.detailsChip}>42% Read</Text><Text style={styles.detailsDot}>•</Text><Text style={styles.detailsPages}>342 Pages</Text></View>
    <Pressable accessibilityRole="button" onPress={onRead} style={styles.detailsContinue}><Text style={styles.detailsContinueIcon}>▣</Text><Text style={styles.detailsContinueText}>Continue Reading</Text></Pressable>
    <Pressable onPress={() => Alert.alert('Start over', 'Reading progress reset for this book.')} style={styles.startOver}><Text style={styles.startOverText}>Start Over</Text></Pressable>
    <View style={styles.modePanel}><Text style={styles.modePanelTitle}>Reading Mode</Text><View style={styles.modeChoices}>{[['▤','Original'],['◉','Comfort'],['ϟ','Bionic']].map(([icon,label]) => <Pressable key={label} onPress={() => setMode(label)} style={[styles.modeChoice, mode === label && styles.modeChoiceActive]}><Text style={styles.modeChoiceIcon}>{icon}</Text><Text style={styles.modeChoiceText}>{label}</Text>{mode === label && <View style={styles.modeIndicator} />}</Pressable>)}</View></View>
  </ScrollView>;
}

function SearchScreen({ onBack }) {
  const [query, setQuery] = useState('green light');
  const results = [{ chapter: 'Chapter 1', page: 'Page 12', text: 'He looked across the bay, seeing nothing but the distant, tiny green light at the end of her dock. It was a beacon...' }, { chapter: 'Chapter 5', page: 'Page 84', text: 'The traffic signal finally changed. A brilliant green light washed over the windshield, and he accelerated into th...' }, { chapter: 'Chapter 9', page: 'Page 156', text: 'In the laboratory, the indicator on the machine flashed a steady green light, confirming the experiment was...' }];
  return <View style={styles.searchScreen}><View style={styles.searchHeader}><Pressable onPress={onBack} style={styles.searchBack}><Text style={styles.searchBackText}>‹</Text></Pressable><Text style={styles.searchHeading}>Search in Book</Text><View style={{ width: 40 }} /></View><View style={styles.searchInputWrap}><Text style={styles.searchInputIcon}>⌕</Text><TextInput value={query} onChangeText={setQuery} placeholder="Search..." style={styles.searchInput} /><Pressable onPress={() => setQuery('')}><Text style={styles.searchClose}>×</Text></Pressable></View><Text style={styles.searchHint}>Tap result to jump to location</Text><ScrollView contentContainerStyle={styles.searchResults}>{results.map((item) => <Pressable key={item.chapter} onPress={() => Alert.alert('Jump to location', `${item.chapter}, ${item.page}`)} style={styles.resultCard}><View style={styles.resultTop}><Text style={styles.resultChapter}>{item.chapter}</Text><Text style={styles.resultPage}>{item.page}</Text></View><Text style={styles.resultText}>{item.text}</Text></Pressable>)}</ScrollView></View>;
}

function ReadingScreen({ onBack, onBionic }) {
  const [toolsVisible, setToolsVisible] = useState(true);
  return <Pressable style={styles.reader} onPress={() => setToolsVisible((value) => !value)}>
    {toolsVisible && <View style={styles.originalTop}><Pressable onPress={onBack} style={styles.readerTool}><Text style={styles.readerIcon}>‹</Text></Pressable><Text style={styles.originalTitle}>The Great Gatsby.pdf</Text><View style={styles.originalActions}><Text style={styles.readerIcon}>⌕</Text><Text style={styles.readerIcon}>⋮</Text></View></View>}
    <ScrollView contentContainerStyle={styles.originalCanvas}><View style={styles.pdfPage}><Text style={styles.pdfFile}>gatsby_chapter1.pdf</Text><Text style={styles.pdfMeta}>Page 1 of 12 | 100%</Text><Text style={styles.pdfChapter}>CHAPTER I</Text><Text style={styles.pdfAuthor}>F. Scott Fitzgerald</Text><Text style={styles.pdfBody}>In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since. "Whenever you feel like criticizing any one," he told me, "just remember that all the people in this world haven't had the advantages that you've had."{`\n\n`}He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that.</Text></View><View style={styles.pdfPageSecondary}><Text style={styles.secondaryText}>sociological theories in consideration of the larger network structures has to perform of one to resume the digital structure of network.</Text></View></ScrollView>
    {toolsVisible && <View style={styles.originalBottom}><View style={styles.pageLabels}><Text style={styles.pageLabelOriginal}>Page 42</Text><Text style={styles.pageLabelOriginal}>342 Pages</Text></View><View style={styles.originalTrack}><View style={styles.originalFill}/><View style={styles.originalThumb}/></View></View>}
    <Pressable accessibilityLabel="Bionic focus settings" style={styles.readerFab} onPress={onBionic}><Text style={styles.readerFabText}>☷</Text></Pressable>
  </Pressable>;
}

function BionicScreen({ onBack }) {
  return <View style={styles.bionicReader}>
    <View style={styles.bionicHeader}><Pressable onPress={onBack} style={styles.readerTool}><Text style={styles.readerIcon}>‹</Text></Pressable><View style={styles.bionicHeading}><Text style={styles.bionicBrand}>BookWorm</Text><Text style={styles.bionicPill}>●  Bionic Focus Active</Text></View><Text style={styles.readerIcon}>♡</Text></View>
    <ScrollText />
    <View style={styles.pagePill}><Text style={styles.pageLabel}>Page 1 of 342</Text><View style={styles.pageTrack}><View style={styles.pageFill} /></View></View>
    <View style={styles.bionicFab}><Text style={styles.readerFabText}>☷</Text></View>
  </View>;
}

function ScrollText() {
  return <ScrollView contentContainerStyle={styles.bionicCanvas}><Text style={styles.bionicChapter}><Text style={styles.bold}>Cha</Text>pter <Text style={styles.bold}>O</Text>ne</Text><Text style={styles.bionicText}><Text style={styles.bold}>It</Text> is a <Text style={styles.bold}>tru</Text>th universally <Text style={styles.bold}>acknowl</Text>edged, that a single man in <Text style={styles.bold}>possess</Text>ion of a good fortune, must be in want of a wife.{`\n\n`}However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the <Text style={styles.bold}>minds</Text> of the surrounding families, that he is considered the rightful property of some one or other of their daughters.{`\n\n`}"My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"{`\n\n`}Mr. <Text style={styles.bold}>Bennet</Text> replied that he had not.</Text></ScrollView>;
}

function BookCard({ book }) {
  return <View style={styles.bookCard}><View style={styles.gridCover}><Text style={styles.coverMark}>BOOK</Text><View style={styles.gridProgress}><View style={[styles.gridProgressFill, { width: '42%' }]} /></View></View><Text numberOfLines={1} style={styles.gridTitle}>{book.title || 'Untitled book'}</Text><Text numberOfLines={1} style={styles.gridAuthor}>{book.author || 'Unknown author'}</Text></View>;
}

function SettingsScreen() {
  const [mode, setMode] = useState('Comfortable');
  const [fontSize, setFontSize] = useState(5);
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const [theme, setTheme] = useState('Light');
  const reset = () => { setMode('Comfortable'); setFontSize(5); setLineSpacing(1.5); setTheme('Light'); };
  return <ScrollView style={styles.settings} contentContainerStyle={styles.settingsContent}>
    <View style={styles.settingsHeader}><View><Text style={styles.settingsEyebrow}>READING</Text><Text style={styles.settingsTitle}>Comfortable</Text></View><View style={styles.settingsBadge}><Text style={styles.settingsBadgeText}>Aa</Text></View></View>
    <Text style={styles.settingsIntro}>Tune your reading space for longer, calmer sessions.</Text>
    <Text style={styles.settingsLabel}>Reading mode</Text>
    <View style={styles.modeRow}>{['Original', 'Comfortable', 'Bionic Focus'].map((item) => <Pressable key={item} onPress={() => setMode(item)} style={[styles.modeButton, mode === item && styles.modeButtonActive]}><Text style={[styles.modeText, mode === item && styles.modeTextActive]}>{item}</Text></Pressable>)}</View>
    <View style={styles.settingBlock}><View style={styles.settingRow}><Text style={styles.settingName}>Font size</Text><Text style={styles.settingValue}>{fontSize}/10</Text></View><View style={styles.sliderRow}><Text style={styles.aaSmall}>Aa</Text><Text style={styles.aaLarge}>Aa</Text></View><View style={styles.stepper}><Pressable accessibilityLabel="Decrease font size" onPress={() => setFontSize(Math.max(1, fontSize - 1))} style={styles.stepButton}><Text style={styles.stepText}>−</Text></Pressable><View style={styles.stepTrack}><View style={[styles.stepFill, { width: `${fontSize * 10}%` }]} /></View><Pressable accessibilityLabel="Increase font size" onPress={() => setFontSize(Math.min(10, fontSize + 1))} style={styles.stepButton}><Text style={styles.stepText}>+</Text></Pressable></View></View>
    <View style={styles.settingBlock}><View style={styles.settingRow}><Text style={styles.settingName}>Line spacing</Text><Text style={styles.settingValue}>{lineSpacing.toFixed(1)}x</Text></View><View style={styles.stepper}><Pressable accessibilityLabel="Decrease line spacing" onPress={() => setLineSpacing(Math.max(1, lineSpacing - .5))} style={styles.stepButton}><Text style={styles.stepText}>−</Text></Pressable><View style={styles.stepTrack}><View style={[styles.stepFill, { width: `${(lineSpacing / 3) * 100}%` }]} /></View><Pressable accessibilityLabel="Increase line spacing" onPress={() => setLineSpacing(Math.min(3, lineSpacing + .5))} style={styles.stepButton}><Text style={styles.stepText}>+</Text></Pressable></View></View>
    <Text style={styles.settingsLabel}>Theme</Text><View style={styles.themeRow}>{[['Light','#FAFAF4','☼'],['Sepia','#F4EBD8','◐'],['Dark','#1A1C19','◑']].map(([name,color,icon]) => <Pressable key={name} onPress={() => setTheme(name)} style={styles.themeItem}><View style={[styles.themeSwatch, { backgroundColor: color }, theme === name && styles.themeSwatchActive]}><Text style={[styles.themeIcon, { color: name === 'Dark' ? '#FFF' : '#53634E' }]}>{icon}</Text></View><Text style={[styles.themeText, theme === name && styles.themeTextActive]}>{name}</Text></Pressable>)}</View>
    <Pressable onPress={reset} style={styles.resetButton}><Text style={styles.resetText}>Reset to defaults</Text></Pressable>
  </ScrollView>;
}

function NavItem({ icon, label, active, onPress }) {
  return (
    <Pressable accessibilityRole="tab" accessibilityState={{ selected: active }} style={styles.navItem} onPress={onPress}>
      <View style={[styles.navIconWrap, active && styles.navIconActive]}><Text style={[styles.navIcon, active && styles.navIconActiveText]}>{icon}</Text></View>
      <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFAF4' }, content: { flex: 1 }, screen: { flex: 1, paddingHorizontal: 24 },
  libraryScreen: { flex: 1, paddingHorizontal: 24 }, topBrand: { flexDirection: 'row', alignItems: 'center', gap: 12 }, libraryBrand: { color: '#012D1D', fontFamily: 'serif', fontSize: 25, fontWeight: '700' }, sectionTitle: { color: '#1A1C19', fontFamily: 'serif', fontSize: 20, fontWeight: '700', marginTop: 22, marginBottom: 14 }, continueCard: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 24, flexDirection: 'row', gap: 18, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 3 }, elevation: 2 }, coverPlaceholder: { width: 112, height: 168, borderRadius: 9, backgroundColor: '#DCE7E3', justifyContent: 'center', alignItems: 'center' }, coverMark: { color: '#53634E', fontFamily: 'serif', fontSize: 15, fontWeight: '700', letterSpacing: 2 }, continueInfo: { flex: 1 }, progressChip: { alignSelf: 'flex-start', backgroundColor: '#D3E5CB', color: '#3B4B38', borderRadius: 14, paddingHorizontal: 10, paddingVertical: 5, fontSize: 12, marginBottom: 12 }, bookTitle: { color: '#1A1C19', fontFamily: 'serif', fontSize: 22, fontWeight: '700', lineHeight: 28 }, author: { color: '#414844', fontFamily: 'serif', fontSize: 15, marginTop: 4 }, progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 22 }, meta: { color: '#414844', fontSize: 11 }, progressTrack: { height: 6, backgroundColor: '#E3E3DE', borderRadius: 3, overflow: 'hidden', marginTop: 7 }, progressFill: { width: '42%', height: '100%', backgroundColor: '#012D1D' }, continueButton: { alignSelf: 'flex-start', backgroundColor: '#012D1D', borderRadius: 24, paddingHorizontal: 20, paddingVertical: 10, marginTop: 18 }, continueButtonText: { color: '#FFF', fontFamily: 'serif', fontSize: 15 }, allBooksHeader: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }, allBooksHeader: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }, viewAll: { color: '#012D1D', fontFamily: 'serif', fontSize: 14 }, bookGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 24 }, bookCard: { width: '47.5%' }, gridCover: { height: 224, borderRadius: 8, backgroundColor: '#E8E8E3', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, gridProgress: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 4, backgroundColor: '#C1C8C2' }, gridProgressFill: { height: '100%', backgroundColor: '#012D1D' }, gridTitle: { color: '#1A1C19', fontFamily: 'serif', fontSize: 15, marginTop: 10 }, gridAuthor: { color: '#414844', fontFamily: 'serif', fontSize: 12, marginTop: 3 }, emptyCard: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 28, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 }, emptyTitle: { color: '#1A1C19', fontFamily: 'serif', fontSize: 21, fontWeight: '700' }, emptyBody: { color: '#414844', fontFamily: 'serif', fontSize: 15, textAlign: 'center', marginTop: 8 }, emptyBooks: { color: '#717973', fontFamily: 'serif', fontSize: 16, textAlign: 'center', marginTop: 30 }, libraryFab: { position: 'absolute', right: 8, bottom: 18, width: 58, height: 58, borderRadius: 29, backgroundColor: '#012D1D', alignItems: 'center', justifyContent: 'center', elevation: 5 }, libraryFabText: { color: '#FFF', fontSize: 36, fontWeight: '300' },
  topBar: { height: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, topIcon: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  bookIcon: { color: '#012D1D', fontSize: 30 }, searchIcon: { color: '#012D1D', fontSize: 40, lineHeight: 38, transform: [{ rotate: '-20deg' }] }, brand: { color: '#012D1D', fontFamily: 'serif', fontSize: 31, fontWeight: '700' },
  hero: { flex: 1, alignItems: 'center', paddingTop: 44 }, heroCompact: { paddingTop: 20 }, logo: { width: 216, height: 216, borderRadius: 20, backgroundColor: '#EEEEE9' }, logoCompact: { width: 132, height: 132 }, logoNarrow: { width: 112, height: 112 },
  heading: { marginTop: 62, color: '#012D1D', fontFamily: 'serif', fontSize: 50, lineHeight: 61, fontWeight: '700', textAlign: 'center' }, headingCompact: { marginTop: 22, fontSize: 38, lineHeight: 44 }, headingNarrow: { fontSize: 34, lineHeight: 39 }, subtitle: { marginTop: 22, color: '#414844', fontFamily: 'serif', fontSize: 27, lineHeight: 46, textAlign: 'center' }, subtitleCompact: { marginTop: 12, fontSize: 18, lineHeight: 28 }, subtitleNarrow: { fontSize: 16, lineHeight: 23 },
  illustration: { marginTop: 94 }, illustrationCompact: { marginTop: 24 }, illustrationNarrow: { marginTop: 14 }, actionArea: { width: '100%', alignItems: 'center', marginTop: 'auto', paddingBottom: 26 }, primaryButton: { width: '92%', maxWidth: 540, height: 94, borderRadius: 48, backgroundColor: '#012D1D', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 22, shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 5, shadowOffset: { width: 0, height: 3 }, elevation: 4 }, primaryButtonCompact: { height: 64 }, primaryButtonNarrow: { width: '100%', height: 58, gap: 14 }, pressed: { opacity: 0.85 }, plus: { color: '#FFF', fontSize: 43, fontWeight: '300' }, primaryButtonText: { color: '#FFF', fontFamily: 'serif', fontSize: 29, fontWeight: '700' }, supports: { color: '#717973', fontFamily: 'serif', fontSize: 20, marginTop: 28 },
  fab: { position: 'absolute', right: 16, bottom: 22, width: 94, height: 94, borderRadius: 47, backgroundColor: '#012D1D', alignItems: 'center', justifyContent: 'center', elevation: 5, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5, shadowOffset: { width: 0, height: 3 } }, fabCompact: { width: 64, height: 64, borderRadius: 32 }, fabNarrow: { width: 56, height: 56, borderRadius: 28, right: 12, bottom: 16 }, fabText: { color: '#FFF', fontSize: 46, fontWeight: '300' },
  navigation: { height: 132, backgroundColor: '#FAFAF4', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 52, borderTopWidth: 1, borderTopColor: '#F4F4EE' }, navigationCompact: { height: 88, paddingHorizontal: 30 }, navItem: { alignItems: 'center', justifyContent: 'center', minWidth: 120 }, navIconWrap: { minWidth: 108, height: 54, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 6 }, navIconActive: { backgroundColor: '#D3E5CB' }, navIcon: { color: '#414844', fontSize: 32 }, navIconActiveText: { color: '#3B4B38' }, navLabel: { color: '#414844', fontFamily: 'serif', fontSize: 19 }, navLabelActive: { color: '#1A1C19' },
  reader: { flex: 1, backgroundColor: '#FAFAF4' }, readerToolbar: { height: 64, paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(250,250,244,0.94)', borderBottomWidth: 1, borderBottomColor: '#E3E3DE' }, readerTool: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center' }, readerIcon: { color: '#414844', fontSize: 32 }, readerTitle: { color: '#1A1C19', fontSize: 18, fontWeight: '600' }, readerCanvas: { flex: 1, paddingHorizontal: 28, paddingTop: 46, paddingBottom: 100 }, chapter: { color: '#012D1D', fontFamily: 'serif', textAlign: 'center', fontSize: 25, fontWeight: '600', marginBottom: 44 }, readerText: { color: '#1A1C19', fontFamily: 'serif', fontSize: 20, lineHeight: 36 }, readerBottom: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 76, backgroundColor: 'rgba(250,250,244,0.94)', borderTopWidth: 1, borderTopColor: '#E3E3DE', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }, readerBottomItem: { color: '#414844', fontSize: 12 }, settings: { flex: 1, padding: 24 }, settingsTitle: { color: '#012D1D', fontFamily: 'serif', fontSize: 32, fontWeight: '700' },
  readerFab: { position: 'absolute', right: 24, bottom: 24, width: 58, height: 58, borderRadius: 29, backgroundColor: '#012D1D', alignItems: 'center', justifyContent: 'center' }, readerFabText: { color: '#FFF', fontSize: 28 }, bionicReader: { flex: 1, backgroundColor: '#FAFAF4' }, bionicHeader: { height: 116, paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, bionicHeading: { alignItems: 'center' }, bionicBrand: { color: '#012D1D', fontFamily: 'serif', fontSize: 31, fontWeight: '700' }, bionicPill: { color: '#53634E', backgroundColor: '#F0F7EC', borderColor: '#D3E5CB', borderWidth: 1, borderRadius: 20, paddingHorizontal: 13, paddingVertical: 6, marginTop: 6, fontFamily: 'serif', fontSize: 14 }, bionicCanvas: { paddingHorizontal: 24, paddingTop: 58, paddingBottom: 130 }, bionicChapter: { color: '#012D1D', fontFamily: 'serif', fontSize: 38, fontWeight: '600', textAlign: 'center', marginBottom: 64 }, bionicText: { color: '#1A1C19', fontFamily: 'serif', fontSize: 20, lineHeight: 36, textAlign: 'justify' }, bold: { fontWeight: '700' }, pagePill: { position: 'absolute', bottom: 22, left: '25%', right: '25%', height: 64, borderRadius: 34, backgroundColor: '#E8E8E3', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14 }, pageLabel: { color: '#414844', fontFamily: 'serif', fontSize: 15 }, pageTrack: { width: 90, height: 5, backgroundColor: '#E3E3DE', borderRadius: 3 }, pageFill: { width: '10%', height: '100%', backgroundColor: '#3F6653', borderRadius: 3 }, bionicFab: { position: 'absolute', right: 24, bottom: 22, width: 58, height: 58, borderRadius: 29, backgroundColor: '#012D1D', alignItems: 'center', justifyContent: 'center' },
});

Object.assign(styles,{details:{flex:1,paddingHorizontal:34},detailsContent:{paddingTop:26,paddingBottom:40,alignItems:'center'},detailsBack:{alignSelf:'flex-start',width:44,height:44,alignItems:'center',justifyContent:'center'},detailsBackText:{fontSize:42,color:'#414844'},detailsCover:{width:'88%',height:590,borderRadius:20,backgroundColor:'#F4F4EE',padding:38},detailsCoverImage:{width:'100%',height:'100%'},detailsTitle:{fontFamily:'serif',fontSize:30,fontWeight:'700',color:'#012D1D',marginTop:28,textAlign:'center'},detailsAuthor:{fontFamily:'serif',fontSize:20,color:'#414844',marginTop:14},detailsMeta:{flexDirection:'row',alignItems:'center',gap:18,marginTop:24},detailsChip:{backgroundColor:'#D3E5CB',color:'#53634E',borderRadius:22,paddingHorizontal:16,paddingVertical:8,fontFamily:'serif',fontSize:16},detailsDot:{color:'#C1C8C2',fontSize:18},detailsPages:{fontFamily:'serif',fontSize:16,color:'#414844'},detailsContinue:{width:'100%',height:78,borderRadius:40,backgroundColor:'#012D1D',marginTop:54,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:14},detailsContinueIcon:{color:'#FFF',fontSize:24},detailsContinueText:{color:'#FFF',fontFamily:'serif',fontSize:22,fontWeight:'700'},startOver:{padding:14},startOverText:{color:'#53634E',fontFamily:'serif',fontSize:16},modePanel:{width:'100%',backgroundColor:'#F4F4EE',borderRadius:22,padding:26,marginTop:54},modePanelTitle:{fontFamily:'serif',fontSize:24,fontWeight:'700',color:'#012D1D',textAlign:'center',marginBottom:24},modeChoices:{flexDirection:'row',gap:14},modeChoice:{flex:1,height:112,borderRadius:16,backgroundColor:'#FFF',alignItems:'center',justifyContent:'center',gap:10},modeChoiceActive:{backgroundColor:'#D3E5CB',borderWidth:1,borderColor:'#86AF99'},modeChoiceIcon:{fontSize:27,color:'#53634E'},modeChoiceText:{fontFamily:'serif',fontSize:16,color:'#414844'},modeIndicator:{position:'absolute',right:8,top:8,width:12,height:12,borderRadius:6,backgroundColor:'#012D1D'}});

Object.assign(styles, { originalTop:{height:76,paddingHorizontal:24,flexDirection:'row',alignItems:'center',backgroundColor:'#FAFAF4',borderBottomWidth:1,borderBottomColor:'#E3E3DE'}, originalTitle:{flex:1,color:'#012D1D',fontSize:24,fontWeight:'600',marginLeft:14}, originalActions:{flexDirection:'row',gap:18}, originalCanvas:{backgroundColor:'#EEEEE9',padding:28,paddingBottom:130,gap:56}, pdfPage:{backgroundColor:'#FFF',minHeight:700,paddingTop:12}, pdfFile:{color:'#414844',fontFamily:'serif',fontSize:16,textAlign:'center',paddingBottom:10}, pdfMeta:{color:'#717973',fontSize:13,textAlign:'center',borderTopWidth:1,borderBottomWidth:1,borderColor:'#E3E3DE',paddingVertical:8}, pdfChapter:{color:'#1A1C19',fontFamily:'serif',fontSize:28,textAlign:'center',marginTop:90}, pdfAuthor:{color:'#414844',fontFamily:'serif',fontSize:22,textAlign:'center',marginTop:18}, pdfBody:{color:'#1A1C19',fontFamily:'serif',fontSize:19,lineHeight:31,marginTop:70,marginHorizontal:-12}, pdfPageSecondary:{backgroundColor:'#FFF',minHeight:430,padding:60}, secondaryText:{color:'#414844',fontFamily:'serif',fontSize:14,lineHeight:22}, originalBottom:{position:'absolute',left:0,right:0,bottom:0,height:112,paddingHorizontal:28,paddingTop:20,backgroundColor:'#FAFAF4'}, pageLabels:{flexDirection:'row',justifyContent:'space-between'}, pageLabelOriginal:{color:'#414844',fontSize:18}, originalTrack:{height:6,backgroundColor:'#E3E3DE',borderRadius:3,marginTop:28}, originalFill:{width:'14%',height:6,backgroundColor:'#012D1D',borderRadius:3}, originalThumb:{position:'absolute',left:'12%',top:-9,width:24,height:24,borderRadius:12,backgroundColor:'#012D1D'} });
