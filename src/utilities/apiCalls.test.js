import {
  getUser,
  getUserProjects,
  getUserPalettes,
  getAllPalettes,
  postNewUser,
  postNewProject,
  postNewPalette,
  deletePalette,
  deleteProject,
  editProjectName,
  editPaletteName
} from "./apiCalls";


describe("getUserProjects", () => {
  let mockResponse;

  beforeEach(() => {
    mockResponse = [
      {
        id: 37,
        name: "project",
        user_id: 16
      },
      {
        id: 38,
        name: "project",
        user_id: 16
      },
      {
        id: 39,
        name: "project",
        user_id: 16
      }
    ];

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });
    });
  });

  it("should return an array of project objects", async () => {
    const result = await getUserProjects();
    expect(result).toEqual(mockResponse);
  });

  it("should call fetch with the correct URL for people", async () => {
    await getUserProjects(1);
    expect(window.fetch).toHaveBeenCalledWith(
      `http://localhost:3001/projects/1`
    );
  });

  it("should return an error if the promise rejects", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject({
        message: ""
      });
    });
    expect(getUserProjects(1)).rejects.toEqual(Error(""));
  });
});

describe("getUserPalettes", () => {
  let mockResponse;
  beforeEach(() => {
    mockResponse = [
      {
        colorFive: "#000000",
        colorFour: "#000000",
        colorOne: "#000000",
        colorThree: "#000000",
        colorTwo: "#000000",
        name: "1234",
        project_id: 1,
        id: 1
      }
    ];

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });
    });
  });
 
  it('should get an array of palettes, that are cleaned', () => {
    let dirtyPalettes = [{
      id: 2,
      project_id: 22,
      name: 'Warm Colors',
      hex_codes: `#FFFFFF,#FFFFFF,#FFFFFF,#FFFFFF,#FFFFFF,`
    },
    {
      id: 3,
      project_id: 23,
      name: 'Cold Colors',
      hex_codes: `#FFFFFF,#FFFFFF,#FFFFFF,#FFFFFF,#FFFFFF,`
    }];
    const expected = [{
      id: 2,
      project_id: 22,
      name: 'Warm Colors',
      colorOne: '#FFFFFF',
      colorTwo: '#FFFFFF',
      colorThree: '#FFFFFF',
      colorFour: '#FFFFFF',
      colorFive: '#FFFFFF',
    },
    {
      id: 3,
      project_id: 23,
      name: 'Cold Colors',
      colorOne: '#FFFFFF',
      colorTwo: '#FFFFFF',
      colorThree: '#FFFFFF',
      colorFour: '#FFFFFF',
      colorFive: '#FFFFFF',
    }];
    
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true, 
        json: () => Promise.resolve(dirtyPalettes)
      });
    });
    
    expect(getUserPalettes(2)).resolves.toEqual(expected);
  });

  
  it("should call fetch with the correct URL for palettes", () => {
    getUserPalettes(1);
    expect(window.fetch).toHaveBeenCalledWith(
      `http://localhost:3001/palettes/1`
    );
  });

  it("should return an error if the promise rejects", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject({
        message: "Cant Get Palettes."
      });
    });
    expect(getUserPalettes()).rejects.toEqual(Error("Cant Get Palettes."));
  });
});
