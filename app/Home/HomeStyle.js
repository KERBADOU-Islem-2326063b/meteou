import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    marginTop: 20,
    alignItems: "center",
    zIndex: 1,
  },
  cityText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  promptText: {
    fontSize: 16,
    color: "gray",
    padding: 10,
  },
  menu: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(101, 98, 223, 0.95)",
    justifyContent: "flex-start",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  closeText: {
    fontSize: 24,
    color: "white",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
  },
  cityPlaceholder: {
    height: 20,
    marginVertical: 5,
    borderRadius: 5,
  },
  cityItem: {
    paddingVertical: 8,
  },
  cityName: {
    color: "white",
    fontSize: 16,
  },
  addCityButton: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 15,
  },
  addCityText: {
    fontSize: 30,
    color: "#6562DF",
    fontWeight: "bold",
  },
  infoPlaceholder: {
    height: 20,
    backgroundColor: "#BBB",
    marginVertical: 5,
    borderRadius: 5,
  },
  logoutButton: {
    backgroundColor: "#5048E5",
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  weatherSummary: {
    marginBottom: 20, 
    padding: 20,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },

  weatherText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },

  formContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
  },
  
  input: {
    backgroundColor: "white",
    color: "black",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  
  validateButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  
  validateText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  sliderContainer: {
    padding: 20,
    width: '100%',
  },
  sliderLabel: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 9,
  },

});

export default styles;